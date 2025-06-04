<?php
require_once 'session_config.php';

$allowed_origins = [
    "http://localhost:3000"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("HTTP/1.1 403 Forbidden");
    exit;
}

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; 
}

try {
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=climate_bind", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $data = json_decode(file_get_contents('php://input'), true);
    $latitude = $data['latitude'] ?? null;
    $longitude = $data['longitude'] ?? null;
    $premium = $data['premium'] ?? null;
    $payout = $data['payout'] ?? null;
    $event = $data['event'] ?? null;
    $temperatureThreshold = $data['temperatureThreshold'] ?? null;

     $eventTypes = [
        'wind' => 'Wind',
        'rain' => 'Rainfall',
        'drought' => 'Drought',
        'temperature' => 'Temperature'
    ];

    $eventType = $eventTypes[$event] ?? null;

    if (!$latitude || !$longitude || !$premium || !$payout || !$eventType) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }

    $pdo->beginTransaction();

    // Inserts latitude, longitude, premium, payout, event type into the policies table
    $stmt = $pdo->prepare("INSERT INTO policies (policy_latitude, policy_longitude, premium_amount, payout_amount, event_type) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$latitude, $longitude, $premium, $payout, $eventType]);
    $policy_id = $pdo->lastInsertId();

    // Adds temperature threshold and event type to triggers table
    $stmt = $pdo->prepare("INSERT INTO triggers (threshold_value, policies_id, event_type) VALUES (?, ?, ?)");
    $stmt->execute([$temperatureThreshold, $policy_id, $eventType]);

    // Updates the user's policy ID
    $stmt = $pdo->prepare("UPDATE users SET policies_id = ? WHERE id = ?");
    $stmt->execute([$policy_id, $_SESSION['id']]);
    
    $pdo->commit();
    echo json_encode(['success' => true]);
    
} catch (Exception $e) {
    if (isset($pdo)) {
        $pdo->rollBack();
    }
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} finally {
    $pdo = null;
}
?>