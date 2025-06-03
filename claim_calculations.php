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
    $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $pdo->beginTransaction();
    // Fetchs the user's policies from the database 'policies' table
    // 'policies' and 'users' tables are joined to link a logged in user to their policy
    $stmt = $pdo->prepare('SELECT p.premium_amount, p.payout_amount 
                          FROM policies p 
                          INNER JOIN users u ON u.policies_id = p.id 
                          WHERE u.id = ?');
    $stmt->execute([$_SESSION['id']]);
    $policies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $pdo->commit();
    
    header('Content-Type: application/json');
    echo json_encode($policies);

} catch (PDOException $e) {
    if (isset($pdo)) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} finally {
    $pdo = null;
}
?>