<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$servername = "127.0.0.1";
$username = "root";
$passwordServer = "";
$dbname = "climate_bind";

$conn = new mysqli($servername, $username, $passwordServer, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$input = json_decode(file_get_contents('php://input'), true);
if ($input === null) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit;
}

$name = $input['first_name'] ?? null;
$email = $input['email'] ?? null;
$password = $input['password'] ?? null;

if (!$name || !$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (email, password, first_name) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
if ($stmt) {
    $stmt->bind_param("sss", $email, $hashedPassword, $name);
    $stmt->execute();
    $stmt->close();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$conn->close();
