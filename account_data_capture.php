<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "127.0.0.1";
$username = "root";
$passwordServer = "";
$dbname = "climate_bind";

$conn = new mysqli($servername, $username, $passwordServer, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_SESSION['id'] ?? null;
//var_dump($id);
$last_name = $_POST['last_name'] ?? null;
$date_of_birth = $_POST['date_of_birth'] ?? null;
$passport_copy = $_FILES['passport_copy'] ?? null;

//var_dump(session_id());
//var_dump($_SESSION);

if (!$id || !$last_name || !$date_of_birth || !$passport_copy) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$sql = "UPDATE users SET last_name = ?, date_of_birth = ?, passport_copy = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt) {
    $null = NULL;
    $stmt->bind_param("ssbi", $last_name, $date_of_birth, $null, $id);
    $stmt->send_long_data(2, file_get_contents($passport_copy['tmp_name']));
    $stmt->execute();
    $stmt->close();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$conn->close();
