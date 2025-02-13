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
$damage_loss_cause = $_POST['damage_loss_cause'] ?? null;
$incident_time_date = $_POST['incident_time_date'] ?? null;
$local_authority_report = $_FILES['local_authority_report'] ?? null;
$damaged_items_list = $_POST['damaged_items_list'] ?? null;
$damaged_items_receipts = $_FILES['damaged_items_receipts'] ?? null;
$photographs = $_FILES['photographs'] ?? null;
$replacement_value = $_POST['replacement_value'] ?? null;
$contractor_repair_estimates = $_FILES['contractor_repair_estimates'] ?? null;
$claim_amount = $_POST['claim_amount'] ?? null;
$bank_account_number_claim = $_POST['bank_account_number_claim'] ?? null;

if (!$id || !$damage_loss_cause || !$incident_time_date || !$local_authority_report || !$damaged_items_list || !$damaged_items_receipts || !$photographs || !$replacement_value || !$contractor_repair_estimates || !$claim_amount || !$bank_account_number_claim) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$sql2 = "INSERT INTO claims (damage_loss_cause, incident_time_date, damaged_items_list, replacement_value, contractor_repair_estimates, claim_amount, bank_account_number_claim) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt2 = $conn->prepare($sql2);
if ($stmt2) {
    $null = NULL;
    $stmt2->bind_param("sssibis", $damage_loss_cause, $incident_time_date, $damaged_items_list, $replacement_value, $null, $claim_amount, $bank_account_number_claim);
    $stmt2->send_long_data(4, file_get_contents($contractor_repair_estimates['tmp_name']));
    $stmt2->execute();
    $stmt2->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$sql3 = "INSERT INTO claim_documents (local_authority_report, damaged_items_receipts, photographs) VALUES (?, ?, ?)";
$stmt3 = $conn->prepare($sql3);
if ($stmt3) {
    $null1 = NULL;
    $stmt3->bind_param("bbb", $null1, $null1, $null1);
    $stmt3->send_long_data(0, file_get_contents($local_authority_report['tmp_name']));
    $stmt3->send_long_data(1, file_get_contents($damaged_items_receipts['tmp_name']));
    $stmt3->send_long_data(2, file_get_contents($photographs['tmp_name']));
    $stmt3->execute();
    $stmt3->close();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$conn->close();
?>