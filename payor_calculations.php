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

            $stmt = $pdo->prepare('SELECT address, first_name, last_name, email, phone FROM users WHERE claims_id = ?');
            $stmt->execute([$claims_payor_id]);
            $matchingUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if (
                $matchingUser &&
                isset($matchingUser['address']) &&
                isset($matchingUser['first_name']) &&
                isset($matchingUser['last_name']) &&
                isset($matchingUser['email']) &&
                isset($matchingUser['phone'])
            ) {

                $response = [
                    'status' => 'success',
                    'message' => 'Matching user information found',
                    'address' => $matchingUser['address'],
                    'full_name' => $matchingUser['first_name'] . ' ' . $matchingUser['last_name'],
                    'email' => $matchingUser['email'],
                    'phone' => $matchingUser['phone']
                ];
            } else {

                $response = [
                    'status' => 'error',
                    'message' => 'User found but complete information is missing'
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