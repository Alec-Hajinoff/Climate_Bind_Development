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
    $postcode = $data['postcode'] ?? null;
    $premium = $data['premium'] ?? null;
    $payout = $data['payout'] ?? null;

    if (!$postcode || !$premium || !$payout) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }

    $pdo->beginTransaction();

    $stmt = $pdo->prepare("SELECT id FROM locations WHERE postcode = ?");
    $stmt->execute([$postcode]);
    $location = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$location) {
        $stmt = $pdo->prepare("INSERT INTO locations (postcode) VALUES (?)");
        $stmt->execute([$postcode]);
        $location_id = $pdo->lastInsertId();
    } else {
        $location_id = $location['id'];
    }

    $stmt = $pdo->prepare("INSERT INTO policies (premium_amount, payout_amount, location_id) VALUES (?, ?, ?)");
    $stmt->execute([$premium, $payout, $location_id]);
    $policy_id = $pdo->lastInsertId();
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