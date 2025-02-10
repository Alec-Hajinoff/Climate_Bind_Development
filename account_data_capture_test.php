<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$servername = "127.0.0.1";
$username = "root";
$passwordServer = "";
$dbname = "climate_bind";

$conn = new mysqli($servername, $username, $passwordServer, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_SESSION['id'] ?? null;
$last_name = $_POST['last_name'] ?? null;
$date_of_birth = $_POST['date_of_birth'] ?? null;
$passport_copy = $_FILES['passport_copy'] ?? null;
$phone = $_POST['phone'] ?? null;
$national_insurance = $_POST['national_insurance'] ?? null;
$address = $_POST['address'] ?? null;
$images = $_FILES['images'] ?? null;
$ownership_proof = $_FILES['ownership_proof'] ?? null;
$date_of_construction = $_POST['date_of_construction'] ?? null;
$square_footage = $_POST['square_footage'] ?? null;
$type_home = $_POST['type_home'] ?? null;
$building_materials = $_POST['building_materials'] ?? null;
$number_levels = $_POST['number_levels'] ?? null;
$roof_type = $_POST['roof_type'] ?? null;

if (!$id || !$last_name || !$date_of_birth || !$passport_copy || !$phone || !$national_insurance || !$address || !$images || !$ownership_proof || !$date_of_construction || !$square_footage || !$type_home || !$building_materials || !$number_levels || !$roof_type) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$sql = "UPDATE users SET last_name = ?, date_of_birth = ?, passport_copy = ?, phone = ?, national_insurance = ?, address = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt) {
    $null = NULL;
    $stmt->bind_param("ssbsssi", $last_name, $date_of_birth, $null, $phone, $national_insurance, $address, $id);
    $stmt->send_long_data(2, file_get_contents($passport_copy['tmp_name']));
    $stmt->execute();
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$sql1 = "INSERT INTO properties (images, ownership_proof, date_of_construction, square_footage, type_home, building_materials, number_levels, roof_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt1 = $conn->prepare($sql1);
if ($stmt1) {
    $null1 = NULL;
    $stmt1->bind_param("bbsissis", $null1, $null1, $date_of_construction, $square_footage, $type_home, $building_materials, $number_levels, $roof_type);
    $stmt1->send_long_data(0, file_get_contents($images['tmp_name']));
    $stmt1->send_long_data(1, file_get_contents($ownership_proof['tmp_name']));
    $stmt1->execute();
    $stmt1->close();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$conn->close();
?>