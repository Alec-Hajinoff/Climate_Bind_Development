<?php
//This files sends updated premium amount and payout amount to the front end when a user selects their postcode and event type.
//The corresponding front end file is ClaimDataCapture.js
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

    $data = json_decode(file_get_contents('php://input'), true);
    $postcode = $data['postcode'] ?? '';
    $event = $data['event'] ?? '';
    $latitude = $data['latitude'] ?? null;
    $longitude = $data['longitude'] ?? null;

    if ($postcode && $event && $latitude !== null && $longitude !== null) {
        $stmt = $pdo->prepare('
            SELECT cp.premium_amount, cp.payout_amount, l.latitude_min, l.longitude_min, l.latitude_max, l.longitude_max
            FROM cover_pricing cp
            JOIN locations l ON cp.location_id = l.id
            WHERE l.postcode = ? AND cp.event_type = ?
        ');
        $stmt->execute([$postcode, $event]);
        $pricing = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($pricing) {
            if ($latitude > $pricing['latitude_min'] && $latitude < $pricing['latitude_max'] &&
                $longitude > $pricing['longitude_min'] && $longitude < $pricing['longitude_max']) {}
            echo json_encode([
                'status' => 'success',
                'payout' => $pricing['payout_amount'],
                'premium' => $pricing['premium_amount']
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'No pricing found for this location and event type'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Postcode and event type are required'
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
} finally {
    $pdo = null;
}
/*
//This files sends updated premium amount and payout amount to the front end when a user selects their postcode and event type.
//The corresponding front end file is ClaimDataCapture.js
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

    $data = json_decode(file_get_contents('php://input'), true);
    $postcode = $data['postcode'] ?? '';
    $event = $data['event'] ?? '';

    if ($postcode && $event) {
        $stmt = $pdo->prepare('
            SELECT cp.premium_amount, cp.payout_amount 
            FROM cover_pricing cp
            JOIN locations l ON cp.location_id = l.id
            WHERE l.postcode = ? AND cp.event_type = ?
        ');
        $stmt->execute([$postcode, $event]);
        $pricing = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($pricing) {
            echo json_encode([
                'status' => 'success',
                'payout' => $pricing['payout_amount'],
                'premium' => $pricing['premium_amount']
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'No pricing found for this location and event type'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Postcode and event type are required'
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
} finally {
    $pdo = null;
}
*/
?>