<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

try {

    $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $response = [];

    $user_id = $_SESSION['id'] ?? null;

    if ($user_id) {
        $stmt = $pdo->prepare('SELECT claims_payor_id FROM users WHERE id = ?');
        $stmt->execute([$user_id]);
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($userData && isset($userData['claims_payor_id'])) {
            $claims_payor_id = $userData['claims_payor_id'];

            $stmt = $pdo->prepare('SELECT address FROM users WHERE claims_id = ?');
            $stmt->execute([$claims_payor_id]);
            $matchingUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($matchingUser && isset($matchingUser['address'])) {
                $response = [
                    'status' => 'success',
                    'message' => 'Matching address found',
                    'address' => $matchingUser['address']
                ];
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'No matching user found with claims_id equal to the claims_payor_id'
                ];
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'No claims_payor_id found for the current user'
            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'User not logged in or session expired'
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} catch (PDOException $e) {
    $errorResponse = [
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ];

    header('Content-Type: application/json');
    echo json_encode($errorResponse);
}
?>
