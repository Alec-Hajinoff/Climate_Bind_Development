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

/*
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
$heating_systems = $_POST['heating_systems'] ?? null;
$safety_features = $_POST['safety_features'] ?? null;
$home_renovations = $_POST['home_renovations'] ?? null;
$previous_claims_externally = $_POST['previous_claims_externally'] ?? null;
$mortgage_lender = $_POST['mortgage_lender'] ?? null;
$current_previous_insurance = $_POST['current_previous_insurance'] ?? null;
$list_previous_disasters = $_POST['list_previous_disasters'] ?? null;
$monthly_premium = $_POST['monthly_premium'] ?? null;
$bank_account_number = $_POST['bank_account_number'] ?? null;
*/

if (!$id || !$damage_loss_cause || !$incident_time_date || !$local_authority_report || !$damaged_items_list || !$damaged_items_receipts || !$photographs || !$replacement_value || !$contractor_repair_estimates || !$claim_amount || !$bank_account_number_claim) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

/*
if (!$id || !$last_name || !$date_of_birth || !$passport_copy || !$phone || !$national_insurance || !$address || !$images || !$ownership_proof || !$date_of_construction || !$square_footage || !$type_home || !$building_materials || !$number_levels || !$roof_type || !$heating_systems || !$safety_features || !$home_renovations || !$previous_claims_externally || !$mortgage_lender || !$current_previous_insurance || !$list_previous_disasters || !$monthly_premium || !$bank_account_number) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}
*/

/*
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

$sql1 = "INSERT INTO properties (images, ownership_proof, date_of_construction, square_footage, type_home, building_materials, number_levels, roof_type, heating_systems, safety_features, home_renovations, mortgage_lender, current_previous_insurance, list_previous_disasters) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt1 = $conn->prepare($sql1);
if ($stmt1) {
    $null1 = NULL;
    $stmt1->bind_param("bbsississsssss", $null1, $null1, $date_of_construction, $square_footage, $type_home, $building_materials, $number_levels, $roof_type, $heating_systems, $safety_features, $home_renovations, $mortgage_lender, $current_previous_insurance, $list_previous_disasters);
    $stmt1->send_long_data(0, file_get_contents($images['tmp_name']));
    $stmt1->send_long_data(1, file_get_contents($ownership_proof['tmp_name']));
    $stmt1->execute();
    $stmt1->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}
*/

$sql2 = "INSERT INTO claims (damage_loss_cause, incident_time_date) VALUES (?, ?)";
$stmt2 = $conn->prepare($sql2);
if ($stmt2) {
    $stmt2->bind_param("ss", $damage_loss_cause, $incident_time_date);
    $stmt2->execute();
    $stmt2->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$sql3 = "INSERT INTO claim_documents (local_authority_report) VALUES (?)";
$stmt3 = $conn->prepare($sql3);
if ($stmt3) {
    $null1 = NULL;
    $stmt3->bind_param("b", $null1);
    $stmt3->send_long_data(0, file_get_contents($local_authority_report['tmp_name']));
    $stmt3->execute();
    $stmt3->close();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$conn->close();
