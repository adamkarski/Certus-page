<?php
// TEMPORARY LOG READER - USUŃ PO UŻYCIU
$password = 'ilwORDkcc4K/aOQUiakcmtw5WNOCBpGt7bDCeX3lIOg=';
$p = $_GET['p'] ?? $_POST['password'] ?? '';
if (!hash_equals($password, $p)) { http_response_code(401); exit('Unauthorized'); }
$log = __DIR__ . '/../email_log.txt';
if (file_exists($log)) { header('Content-Type: text/plain'); echo file_get_contents($log); }
else { echo 'No log file found'; }
