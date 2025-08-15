<?php
/**
 * API Endpoint dla formularza kontaktu serwisowego Certus
 * 
 * Obsługuje:
 * - Wysyłanie email z danymi formularza
 * - Upload i attachowanie plików audio
 * - Walidację danych
 * - Zwraca JSON response dla frontend
 */

// Ustawienia CORS dla frontend
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Obsługa tylko POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metoda niedozwolona']);
    exit;
}

// Konfiguracja email - będzie określana dynamicznie na podstawie formType
const MAIL_FROM = 'noreply@mg-certus.pl';

// Konfiguracja uploadów
const UPLOAD_DIR = 'uploads/audio/';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['audio/webm', 'audio/mp4', 'audio/wav'];

try {
    // Walidacja danych
    $requiredFields = ['firstName', 'lastName', 'email', 'phone', 'serviceType', 'message'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Pole {$field} jest wymagane");
        }
    }
    
    // Sanityzacja danych
    $data = [
        'firstName' => filter_var($_POST['firstName'], FILTER_SANITIZE_STRING),
        'lastName' => filter_var($_POST['lastName'], FILTER_SANITIZE_STRING),
        'email' => filter_var($_POST['email'], FILTER_SANITIZE_EMAIL),
        'phone' => filter_var($_POST['phone'], FILTER_SANITIZE_STRING),
        'serviceType' => filter_var($_POST['serviceType'], FILTER_SANITIZE_STRING),
        'message' => filter_var($_POST['message'], FILTER_SANITIZE_STRING),
        'country' => filter_var($_POST['country'] ?? 'PL', FILTER_SANITIZE_STRING),
        'messageType' => filter_var($_POST['messageType'] ?? 'text', FILTER_SANITIZE_STRING),
        'timestamp' => filter_var($_POST['timestamp'] ?? date('c'), FILTER_SANITIZE_STRING),
        'userAgent' => filter_var($_POST['userAgent'] ?? '', FILTER_SANITIZE_STRING),
        'formType' => filter_var($_POST['formType'] ?? 'serwis', FILTER_SANITIZE_STRING),
    ];
    
    // Określ adres docelowy i temat na podstawie typu formularza
    $formType = $data['formType'];
    if ($formType === 'main-kontakt') {
        $mailTo = 'biuro@mg-certus.pl';
        $mailSubject = 'Nowe zapytanie - Certus';
        $isMainContact = true;
    } else {
        // Domyślnie: formularz serwisowy
        $mailTo = 'serwis@mg-certus.pl'; 
        $mailSubject = 'Nowe zgłoszenie serwisowe - Certus';
        $isMainContact = false;
    }
    
    // Walidacja email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Nieprawidłowy format email');
    }
    
    // Obsługa pliku audio (jeśli istnieje)
    $audioFilePath = null;
    if (isset($_FILES['audioMessage']) && $_FILES['audioMessage']['error'] === UPLOAD_ERR_OK) {
        $audioFile = $_FILES['audioMessage'];
        
        // Sprawdź rozmiar pliku
        if ($audioFile['size'] > MAX_FILE_SIZE) {
            throw new Exception('Plik audio jest za duży (max 10MB)');
        }
        
        // Sprawdź typ MIME
        if (!in_array($audioFile['type'], ALLOWED_TYPES)) {
            throw new Exception('Nieobsługiwany format audio');
        }
        
        // Stwórz katalog jeśli nie istnieje
        if (!is_dir(UPLOAD_DIR)) {
            mkdir(UPLOAD_DIR, 0755, true);
        }
        
        // Generuj bezpieczną nazwę pliku
        $extension = pathinfo($audioFile['name'], PATHINFO_EXTENSION);
        $fileName = 'audio_' . date('Y-m-d_H-i-s') . '_' . uniqid() . '.' . $extension;
        $audioFilePath = UPLOAD_DIR . $fileName;
        
        // Przenieś plik
        if (!move_uploaded_file($audioFile['tmp_name'], $audioFilePath)) {
            throw new Exception('Błąd podczas zapisywania pliku audio');
        }
    }
    
    // Przygotuj treść email
    $emailBody = buildEmailBody($data, $audioFilePath, $isMainContact);
    
    // Wyślij email
    $mailSent = sendEmail($mailTo, $mailSubject, $emailBody, $audioFilePath);
    
    if (!$mailSent) {
        throw new Exception('Błąd podczas wysyłania email');
    }
    
    // Zapisz do bazy danych (opcjonalnie)
    // saveToDatabase($data, $audioFilePath);
    
    // Odpowiedź sukcesu
    echo json_encode([
        'success' => true,
        'message' => 'Dziękujemy za kontakt! Nasz zespół serwisowy skontaktuje się z Tobą w ciągu 24 godzin.',
        'id' => uniqid() // ID zgłoszenia dla trackingu
    ]);
    
} catch (Exception $e) {
    // Loguj błąd
    error_log("Serwis kontakt error: " . $e->getMessage());
    
    // Odpowiedź błędu
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

/**
 * Buduje treść email z danych formularza
 */
function buildEmailBody($data, $audioFilePath = null, $isMainContact = false) {
    $serviceTypes = [
        'warranty' => 'Serwis gwarancyjny',
        'post-warranty' => 'Serwis pogwarancyjny',
        'inspection' => 'Przegląd techniczny',
        'repair' => 'Naprawa awaryjna',
        'maintenance' => 'Konserwacja',
        'upgrade' => 'Modernizacja',
        'consultation' => 'Konsultacja techniczna'
    ];
    
    $serviceTypeLabel = $serviceTypes[$data['serviceType']] ?? $data['serviceType'];
    
    // Różne tytuły i ikony w zależności od typu formularza
    if ($isMainContact) {
        $headerTitle = "📧 Nowe zapytanie - Certus";
        $pageTitle = "Nowe zapytanie";
        $serviceFieldLabel = "Typ zapytania:";
    } else {
        $headerTitle = "🔧 Nowe zgłoszenie serwisowe - Certus";
        $pageTitle = "Nowe zgłoszenie serwisowe";
        $serviceFieldLabel = "Typ usługi:";
    }
    
    $body = "
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>{$pageTitle}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .header { background: #cddc39; padding: 20px; color: white; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; }
            .audio-info { background: #f0f9ff; padding: 15px; border-left: 4px solid #0ea5e9; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h1>{$headerTitle}</h1>
        </div>
        
        <div class='content'>
            <div class='field'>
                <span class='label'>Imię i nazwisko:</span>
                <span class='value'>{$data['firstName']} {$data['lastName']}</span>
            </div>
            
            <div class='field'>
                <span class='label'>Email:</span>
                <span class='value'><a href='mailto:{$data['email']}'>{$data['email']}</a></span>
            </div>
            
            <div class='field'>
                <span class='label'>Telefon:</span>
                <span class='value'><a href='tel:{$data['phone']}'>{$data['phone']}</a></span>
            </div>
            
            <div class='field'>
                <span class='label'>Kraj:</span>
                <span class='value'>{$data['country']}</span>
            </div>
            
            <div class='field'>
                <span class='label'>{$serviceFieldLabel}</span>
                <span class='value'>{$serviceTypeLabel}</span>
            </div>
            
            <div class='field'>
                <span class='label'>" . ($isMainContact ? 'Wiadomość:' : 'Opis problemu:') . "</span>
                <div class='value'>" . nl2br(htmlspecialchars($data['message'])) . "</div>
            </div>";
    
    if ($audioFilePath) {
        $body .= "
            <div class='audio-info'>
                <h3>📢 Wiadomość głosowa</h3>
                <p>Klient nagrał wiadomość głosową opisującą problem.</p>
                <p><strong>Plik:</strong> " . basename($audioFilePath) . "</p>
                <p><em>Wiadomość audio została dołączona do tego emaila.</em></p>
            </div>";
    }
    
    $body .= "
            <hr style='margin: 30px 0;'>
            
            <div style='color: #666; font-size: 12px;'>
                <p><strong>Szczegóły techniczne:</strong></p>
                <p>Wysłano: {$data['timestamp']}</p>
                <p>User Agent: {$data['userAgent']}</p>
                <p>Typ wiadomości: {$data['messageType']}</p>
            </div>
        </div>
    </body>
    </html>";
    
    return $body;
}

/**
 * Wysyła email z załącznikiem audio
 */
function sendEmail($to, $subject, $body, $audioFilePath = null) {
    // Boundary dla multipart message
    $boundary = md5(time());
    
    // Headers
    $headers = [
        "From: " . MAIL_FROM,
        "Reply-To: " . $_POST['email'],
        "MIME-Version: 1.0",
        "Content-Type: multipart/mixed; boundary=\"{$boundary}\""
    ];
    
    // Message body
    $message = "--{$boundary}\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $body . "\r\n";
    
    // Załącz plik audio jeśli istnieje
    if ($audioFilePath && file_exists($audioFilePath)) {
        $filename = basename($audioFilePath);
        $content = chunk_split(base64_encode(file_get_contents($audioFilePath)));
        $mimeType = mime_content_type($audioFilePath);
        
        $message .= "\r\n--{$boundary}\r\n";
        $message .= "Content-Type: {$mimeType}; name=\"{$filename}\"\r\n";
        $message .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $message .= $content . "\r\n";
    }
    
    $message .= "\r\n--{$boundary}--\r\n";
    
    // Wyślij email
    return mail($to, $subject, $message, implode("\r\n", $headers));
}

/**
 * Opcjonalnie: Zapisz dane do bazy danych
 */
function saveToDatabase($data, $audioFilePath = null) {
    // Implementuj zapis do bazy danych tutaj
    // np. MySQL, PostgreSQL, SQLite
    
    try {
        // $pdo = new PDO('mysql:host=localhost;dbname=certus', $username, $password);
        // $stmt = $pdo->prepare("INSERT INTO service_requests (firstName, lastName, email, phone, serviceType, message, audioFile, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
        // $stmt->execute([$data['firstName'], $data['lastName'], $data['email'], $data['phone'], $data['serviceType'], $data['message'], $audioFilePath]);
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
    }
}
?>