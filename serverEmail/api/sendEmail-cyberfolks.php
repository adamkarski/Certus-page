<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- Load .env from same directory ---
$envFile = __DIR__ . '/.env';
if (!file_exists($envFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration error: .env file not found.']);
    exit;
}
$lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '' || $line[0] === '#') continue;
    if (strpos($line, '=') !== false) {
        [$key, $value] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
    }
}

// --- PHPMailer setup ---
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// --- CORS headers (allowlist) ---
$allowedOrigins = [
    'https://mg-certus.pl',
    'https://www.mg-certus.pl',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// --- Response type ---
header('Content-Type: application/json; charset=utf-8');

// --- Method guard ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// --- Logging ---
$log_file = __DIR__ . '/email_log.txt';
function write_log($message) {
    global $log_file;
    $timestamp = date("Y-m-d H:i:s");
    file_put_contents($log_file, "[" . $timestamp . "] " . $message . "\n", FILE_APPEND);
}

write_log("--- New Request ---");

// --- Request data handling ---
$data = [];
$isMultipart = false;

if (isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "multipart/form-data") !== false) {
    $isMultipart = true;
    $data = $_POST;
    write_log("Received multipart/form-data. POST data: " . print_r($data, true));
    if (isset($_FILES['audio'])) {
        write_log("Received audio file: " . print_r($_FILES['audio'], true));
    }
} else {
    $postData = file_get_contents("php://input");
    $data = json_decode($postData, true);
    write_log("Received JSON data: " . $postData);
}

if ($data === null) {
    $error_message = 'Error decoding request data.';
    write_log($error_message);
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $error_message]);
    exit;
}

write_log("Processed data: " . print_r($data, true));

if (!isset($data['email']) || !isset($data['formType'])) {
    $error_message = 'Missing required fields (email or formType).';
    write_log($error_message);
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $error_message, 'received_data' => $data]);
    exit;
}

// --- Cloudflare Turnstile Verification ---
if (!isset($data['cf-turnstile-response'])) {
    $error_message = 'Turnstile token missing.';
    write_log($error_message);
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $error_message]);
    exit;
}

$turnstile_response = $data['cf-turnstile-response'];
    $secret_key = '0x4AAAAAACEnWmYxJ485BOOXrQZBbobe-Jc';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'secret'   => $secret_key,
        'response' => $turnstile_response,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? null,
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);

    if ($response === false) {
        $err = curl_error($ch);
        curl_close($ch);
        write_log('Turnstile cURL error: ' . $err);
        http_response_code(502);
        echo json_encode(['success' => false, 'message' => 'Turnstile verification error.']);
        exit;
    }

    curl_close($ch);

    $turnstile_result = json_decode($response, true);

    if (!is_array($turnstile_result) || empty($turnstile_result['success'])) {
        $codes = $turnstile_result['error-codes'] ?? [];
        $codesStr = is_array($codes) ? implode(', ', $codes) : (string)$codes;
        write_log('Turnstile verification failed. Errors: ' . $codesStr);
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Turnstile verification failed.']);
        exit;
    }
    write_log('Turnstile verification successful.');

// --- Email construction ---
$to = 'gmaro@mg-certus.pl';
$subject = '';
$message_body = '';
$message_text = $data['message'] ?? '';

if ($data['formType'] === 'main-kontakt') {
    $subject = 'Nowa wiadomość z formularza kontaktowego (Certus)';
    $message_body = "
        <html><body>
          <h2>Nowa wiadomość z formularza kontaktowego</h2>
          <p><strong>Imię:</strong> " . htmlspecialchars($data['firstName'] ?? '') . "</p>
          <p><strong>Nazwisko:</strong> " . htmlspecialchars($data['lastName'] ?? '') . "</p>
          <p><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>
          <p><strong>Telefon:</strong> " . htmlspecialchars($data['phone'] ?? '') . "</p>
          <p><strong>Wiadomość:</strong></p>
          <p>" . nl2br(htmlspecialchars($message_text)) . "</p>
        </body></html>";
} elseif ($data['formType'] === 'serwis-kontakt') {
    $serviceType = $data['serviceType'] ?? '';
    $phone = $data['phone'] ?? '';
    $subject = 'Zgłoszenie serwisowe - ' . $serviceType . ' - Tel: ' . $phone;
    $message_body = "
        <html><body style=\"font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;\">
          <h2 style=\"color: #96a500; border-bottom: 2px solid #96a500; padding-bottom: 8px;\">Nowe zgłoszenie serwisowe</h2>
          <table cellpadding=\"8\" cellspacing=\"0\" style=\"border-collapse: collapse; width: 100%; max-width: 600px;\">
            <tr><td style=\"border-bottom: 1px solid #eee; font-weight: bold; color: #666; width: 180px;\">Typ usługi</td>
                <td style=\"border-bottom: 1px solid #eee;\">" . htmlspecialchars($serviceType) . "</td></tr>
            <tr><td style=\"border-bottom: 1px solid #eee; font-weight: bold; color: #666;\">Imię</td>
                <td style=\"border-bottom: 1px solid #eee;\">" . htmlspecialchars($data['firstName'] ?? '') . "</td></tr>
            <tr><td style=\"border-bottom: 1px solid #eee; font-weight: bold; color: #666;\">Nazwisko</td>
                <td style=\"border-bottom: 1px solid #eee;\">" . htmlspecialchars($data['lastName'] ?? '') . "</td></tr>
            <tr><td style=\"border-bottom: 1px solid #eee; font-weight: bold; color: #666;\">Email</td>
                <td style=\"border-bottom: 1px solid #eee;\">" . htmlspecialchars($data['email']) . "</td></tr>
            <tr><td style=\"border-bottom: 1px solid #eee; font-weight: bold; color: #666;\">Model maszyny</td>
                <td style=\"border-bottom: 1px solid #eee;\">" . htmlspecialchars($data['machineModel'] ?? 'Nie podano') . "</td></tr>
            <tr><td style=\"border-bottom: 1px solid #eee; font-weight: bold; color: #666;\">Numer seryjny</td>
                <td style=\"border-bottom: 1px solid #eee;\">" . htmlspecialchars($data['serialNumber'] ?? 'Nie podano') . "</td></tr>
            <tr><td style=\"border-bottom: 1px solid #eee; font-weight: bold; color: #666;\">Telefon</td>
                <td style=\"border-bottom: 1px solid #eee;\">" . htmlspecialchars($phone) . "</td></tr>
            <tr><td style=\"font-weight: bold; color: #666;\">Opis problemu</td>
                <td>" . nl2br(htmlspecialchars($message_text)) . "</td></tr>
          </table>
        </body></html>";
} else {
    $error_message = 'Nieznany typ formularza.';
    write_log($error_message);
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $error_message]);
    exit;
}

// --- SMTP credentials from .env ---
$smtpHost     = $_ENV['SMTP_HOST'] ?? '';
$smtpPort     = (int)($_ENV['SMTP_PORT'] ?? 465);
$smtpUser     = $_ENV['SMTP_USER'] ?? '';
$smtpPass     = $_ENV['SMTP_PASS'] ?? '';

if (empty($smtpHost) || empty($smtpUser) || empty($smtpPass)) {
    $error_message = 'Server configuration error: SMTP credentials missing in .env.';
    write_log($error_message);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $error_message]);
    exit;
}

// --- Main Email to Admin ---
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $smtpPort;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($smtpUser, 'Formularz Certus');
    $mail->addAddress('gmaro@mg-certus.pl', 'Certus');
    $mail->addAddress('zbigniew.karski@gmail.com', 'Zbigniew Karski');
    $mail->addReplyTo($data['email'], ($data['firstName'] ?? '') . ' ' . ($data['lastName'] ?? ''));

    if ($isMultipart && isset($_FILES['audio']) && $_FILES['audio']['error'] == UPLOAD_ERR_OK) {
        $mail->addAttachment($_FILES['audio']['tmp_name'], $_FILES['audio']['name']);
        $message_body .= "<p><strong>Do wiadomości załączono nagranie audio.</strong></p>";
    }

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $message_body;
    $mail->AltBody = strip_tags($message_body);

    $mail->send();
    write_log("Admin email sent successfully to {$to} + gmaro@mg-certus.pl.");

    // --- Auto-reply to User ---
    try {
        $userMail = new PHPMailer(true);
        $userMail->isSMTP();
        $userMail->Host       = $smtpHost;
        $userMail->SMTPAuth   = true;
        $userMail->Username   = $smtpUser;
        $userMail->Password   = $smtpPass;
        $userMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $userMail->Port       = $smtpPort;
        $userMail->CharSet    = 'UTF-8';

        $userMail->setFrom($smtpUser, 'Certus CNC');
        $userMail->addAddress($data['email']);

        $userMail->isHTML(true);
        $userMail->Subject = 'Potwierdzenie otrzymania wiadomości - Certus CNC';
        $userMail->Body    = '
            <html><body>
              <h3>Dziękujemy za Twoją wiadomość!</h3>
              <p>Otrzymaliśmy Twoje zapytanie i wkrótce się z Tobą skontaktujemy.</p>
              <p>Pozdrawiamy,<br>Zespół Certus CNC</p>
              <hr>
              <p><small>To jest automatyczna wiadomość, prosimy na nią nie odpowiadać.</small></p>
            </body></html>';
        $userMail->AltBody = 'Dziękujemy za Twoją wiadomość! Otrzymaliśmy Twoje zapytanie i wkrótce się z Tobą skontaktujemy. Pozdrawiamy, Zespół Certus CNC';

        $userMail->send();
        write_log("Confirmation email sent successfully to {$data['email']}.");
    } catch (Exception $e) {
        write_log("Confirmation email failed for {$data['email']}: {$userMail->ErrorInfo}");
        // Don't fail the main request — admin email was already sent
    }

    echo json_encode(['success' => true, 'message' => 'Wiadomość została wysłana pomyślnie.']);

} catch (Exception $e) {
    $error_message = "Wiadomość nie mogła zostać wysłana. Błąd: {$mail->ErrorInfo}";
    write_log($error_message);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $error_message]);
}
?>
