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
$contractor_repair_estimates = $_FILES['contractor_repair_estimates'] ?? null;
$claim_amount = $_POST['claim_amount'] ?? null;
$bank_account_number_claim = $_POST['bank_account_number_claim'] ?? null;

if (!$id || !$damage_loss_cause || !$incident_time_date || !$local_authority_report || !$damaged_items_list || !$damaged_items_receipts || !$photographs || !$contractor_repair_estimates || !$claim_amount || !$bank_account_number_claim) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$_SESSION['claim_amount'] = $claim_amount;

$claim_submission_date = date('Y-m-d');

$sql2 = "INSERT INTO claims (damage_loss_cause, incident_time_date, damaged_items_list, contractor_repair_estimates, claim_amount, bank_account_number_claim, claim_submission_date) VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt2 = $conn->prepare($sql2);
if ($stmt2) {
    $null = NULL;
    $stmt2->bind_param("sssbiss", $damage_loss_cause, $incident_time_date, $damaged_items_list, $null, $claim_amount, $bank_account_number_claim, $claim_submission_date);

    $stmt2->send_long_data(3, file_get_contents($contractor_repair_estimates['tmp_name']));
    $stmt2->execute();

    $last_claim_id = $conn->insert_id;

    $sql_update = "UPDATE users SET claims_id = ? WHERE id = ?";
    $stmt_update = $conn->prepare($sql_update);
    if ($stmt_update) {
        $stmt_update->bind_param("ii", $last_claim_id, $id);
        $stmt_update->execute();
        $stmt_update->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }
    $sql_update_all = "UPDATE users SET claims_payor_id = ? WHERE claims_payor_id IS NULL";
    $stmt_update_all = $conn->prepare($sql_update_all);
    if ($stmt_update_all) {
        $stmt_update_all->bind_param("i", $last_claim_id);
        $stmt_update_all->execute();
        $stmt_update_all->close();
    }
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

    $last_claim_doc_id = $conn->insert_id;

    $sql_update_claim_doc = "UPDATE users SET claim_doc_id = ? WHERE id = ?";
    $stmt_update_claim_doc = $conn->prepare($sql_update_claim_doc);
    if ($stmt_update_claim_doc) {
        $stmt_update_claim_doc->bind_param("ii", $last_claim_doc_id, $id);
        $stmt_update_claim_doc->execute();
        $stmt_update_claim_doc->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }
    $stmt3->close();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$conn->close();
?>