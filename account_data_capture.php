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
$heating_systems = $_POST['heating_systems'] ?? null;
$safety_features = $_POST['safety_features'] ?? null;
$home_renovations = $_POST['home_renovations'] ?? null;
$mortgage_lender = $_POST['mortgage_lender'] ?? null;
$current_previous_insurance = $_POST['current_previous_insurance'] ?? null;
$list_previous_disasters = $_POST['list_previous_disasters'] ?? null;
$monthly_premium = $_POST['monthly_premium'] ?? null;
$bank_account_number = $_POST['bank_account_number'] ?? null;

if (!$id || !$last_name || !$date_of_birth || !$passport_copy || !$phone || !$national_insurance || !$address || !$images || !$ownership_proof || !$date_of_construction || !$square_footage || !$type_home || !$building_materials || !$number_levels || !$roof_type || !$heating_systems || !$safety_features || !$home_renovations || !$mortgage_lender || !$current_previous_insurance || !$list_previous_disasters || !$monthly_premium || !$bank_account_number) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$sql = "UPDATE users SET last_name = ?, date_of_birth = ?, passport_copy = ?, phone = ?, national_insurance = ?, address = ?, profile_complete = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt) {
    $null = NULL;
    $profile_complete = 1;
+   $stmt->bind_param("ssbsssis", $last_name, $date_of_birth, $null, $phone, $national_insurance, $address, $profile_complete, $id);
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

    $property_id = $conn->insert_id;

    $sql2 = "UPDATE users SET property_id = ? WHERE id = ?";
    $stmt2 = $conn->prepare($sql2);
    if ($stmt2) {
        $stmt2->bind_param("ii", $property_id, $id);
        $stmt2->execute();
        $stmt2->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }

    $stmt1->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$sql3 = "INSERT INTO premiums (monthly_premium, bank_account_number) VALUES (?, ?)";
$stmt3 = $conn->prepare($sql3);
if ($stmt3) {
    $stmt3->bind_param("ss", $monthly_premium, $bank_account_number);
    $stmt3->execute();

    $premiums_id = $conn->insert_id;

    $sql4 = "UPDATE users SET premiums_id = ? WHERE id = ?";
    $stmt4 = $conn->prepare($sql4);
    if ($stmt4) {
        $stmt4->bind_param("ii", $premiums_id, $id);
        $stmt4->execute();
        $stmt4->close();
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
