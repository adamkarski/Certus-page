<?php
/**
 * TEMPORARY FILE UPLOAD ENDPOINT
 * 
 * ⚠️  USUŃ TEN PLIK PO ZAKOŃCZENIU PRACY
 * ⚠️  LUB USTAW PRAWA NA 0444 (tylko odczyt)
 * 
 * Hasło: ilwORDkcc4K/aOQUiakcmtw5WNOCBpGt7bDCeX3lIOg=
 */

// --- Konfiguracja ---
$UPLOAD_PASSWORD = 'ilwORDkcc4K/aOQUiakcmtw5WNOCBpGt7bDCeX3lIOg=';
$ALLOWED_EXTENSIONS = ['php', 'env', 'txt', 'json'];
$MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
$LOG_FILE = __DIR__ . '/upload_log.txt';

// --- Logging ---
function upload_log($message) {
    global $LOG_FILE;
    $timestamp = date("Y-m-d H:i:s");
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    file_put_contents($LOG_FILE, "[$timestamp] [$ip] $message\n", FILE_APPEND);
}

// --- CORS ---
header('Content-Type: application/json; charset=utf-8');

// --- Method guard ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'POST only']);
    exit;
}

// --- Password check ---
$password = $_POST['password'] ?? $_SERVER['HTTP_X_PASSWORD'] ?? '';
if (!hash_equals($UPLOAD_PASSWORD, $password)) {
    upload_log("FAILED login attempt");
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

upload_log("authenticated");

// --- Check file upload ---
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $error_codes = [
        UPLOAD_ERR_INI_SIZE => 'File exceeds server limit',
        UPLOAD_ERR_FORM_SIZE => 'File exceeds form limit',
        UPLOAD_ERR_PARTIAL => 'File partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temp folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write to disk',
        UPLOAD_ERR_EXTENSION => 'Upload blocked by extension',
    ];
    $err = $_FILES['file']['error'] ?? -1;
    $msg = $error_codes[$err] ?? 'Unknown upload error';
    upload_log("upload failed: $msg");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $msg]);
    exit;
}

// --- File size check ---
if ($_FILES['file']['size'] > $MAX_FILE_SIZE) {
    upload_log("file too large: {$_FILES['file']['size']} bytes");
    http_response_code(413);
    echo json_encode(['success' => false, 'message' => 'File too large (max 5MB)']);
    exit;
}

// --- Extension check ---
$filename = $_FILES['file']['name'];
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
if (!in_array($ext, $ALLOWED_EXTENSIONS)) {
    upload_log("blocked extension: $ext");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => "Extension '.$ext' not allowed. Allowed: " . implode(', ', $ALLOWED_EXTENSIONS)]);
    exit;
}

// --- Destination ---
$target_dir = $_POST['directory'] ?? __DIR__;
$target_dir = rtrim($target_dir, '/');

// Security: only allow writing to api/ or subdirectories
$real_api_dir = realpath(__DIR__);
$real_target = realpath($target_dir);
if ($real_target === false || strpos($real_target, $real_api_dir) !== 0) {
    upload_log("directory traversal blocked: $target_dir");
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Cannot write outside api/ directory']);
    exit;
}

// --- Target filename ---
$target_name = $_POST['filename'] ?? $filename;
$target_name = basename($target_name); // strip any path components
$target_path = $target_dir . '/' . $target_name;

// --- Backup existing file ---
if (file_exists($target_path)) {
    $backup_path = $target_path . '.bak.' . date('Ymd-His');
    copy($target_path, $backup_path);
    upload_log("backup created: $backup_path");
}

// --- Move uploaded file ---
if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
    upload_log("SUCCESS: uploaded $filename → $target_path (" . $_FILES['file']['size'] . " bytes)");
    echo json_encode([
        'success' => true,
        'message' => "File uploaded: $target_name",
        'path' => $target_path,
        'size' => $_FILES['file']['size'],
    ]);
} else {
    upload_log("move_uploaded_file failed for $filename");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save file']);
}
?>
