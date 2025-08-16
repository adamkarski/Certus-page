<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- PHPMailer setup ---
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// --- CORS headers ---
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// --- Logging ---
$log_file = 'email_log.txt';
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

// --- Email construction ---
$to = 'zbigniewkarski@yahoo.com'; // Main recipient
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
    $subject = 'Nowe zgłoszenie serwisowe (Certus)';
    $message_body = "
        <html><body>
          <h2>Nowe zgłoszenie serwisowe</h2>
          <p><strong>Imię:</strong> " . htmlspecialchars($data['firstName'] ?? '') . "</p>
          <p><strong>Nazwisko:</strong> " . htmlspecialchars($data['lastName'] ?? '') . "</p>
          <p><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>
          <p><strong>Telefon:</strong> " . htmlspecialchars($data['phone'] ?? '') . "</p>
          <p><strong>Typ usługi:</strong> " . htmlspecialchars($data['serviceType'] ?? '') . "</p>
          <p><strong>Opis problemu:</strong></p>
          <p>" . nl2br(htmlspecialchars($message_text)) . "</p>
        </body></html>";
} else {
    $error_message = 'Nieznany typ formularza.';
    write_log($error_message);
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $error_message]);
    exit;
}

// --- Main Email to Admin ---
$mail = new PHPMailer(true);
try {
    //Server settings - WARNING: Storing credentials in code is insecure.
    $mail->isSMTP();
    $mail->Host       = 'dm73147.domenomania.eu';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'certus@dm73147.domenomania.eu';
    $mail->Password   = 'I2h(1dBTN=KeNIAK';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    //Recipients
    $mail->setFrom('certus@dm73147.domenomania.eu', 'Formularz Certus');
    $mail->addAddress($to, 'Adam Karski');
    $mail->addReplyTo($data['email'], ($data['firstName'] ?? '') . ' ' . ($data['lastName'] ?? ''));

    // Attachments
    if ($isMultipart && isset($_FILES['audio']) && $_FILES['audio']['error'] == UPLOAD_ERR_OK) {
        $mail->addAttachment($_FILES['audio']['tmp_name'], $_FILES['audio']['name']);
        $message_body .= "<p><strong>Do wiadomości załączono nagranie audio.</strong></p>";
    }

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $message_body;
    $mail->AltBody = strip_tags($message_body);

    $mail->send();
    write_log("Admin email sent successfully to {$to}.");

    // --- Auto-reply to User ---
    $userMail = new PHPMailer(true);
    //Server settings
    $userMail->isSMTP();
    $userMail->Host       = 'dm73147.domenomania.eu';
    $userMail->SMTPAuth   = true;
    $userMail->Username   = 'certus@dm73147.domenomania.eu';
    $userMail->Password   = 'I2h(1dBTN=KeNIAK';
    $userMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $userMail->Port       = 465;
    $userMail->CharSet    = 'UTF-8';

    //Recipient
    $userMail->setFrom('certus@dm73147.domenomania.eu', 'Certus CNC');
    $userMail->addAddress($data['email']);

    //Content
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

    // --- Final response to frontend ---
    echo json_encode(['success' => true, 'message' => 'Wiadomość została wysłana pomyślnie.']);

} catch (Exception $e) {
    $error_message = "Wiadomość nie mogła zostać wysłana. Błąd: {$mail->ErrorInfo}";
    write_log($error_message);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $error_message]);
}
?>