<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['email'], $input['password'])) {

    $email = trim($input['email']);
    $password = $input['password'];
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION["id"] = $user["id"];

            $stmt = $pdo->prepare('SELECT profile_complete, claims_id FROM users WHERE id = ?');
            $stmt->execute([$user['id']]);
            $registrationData = $stmt->fetch();

            $response = [
                'status' => 'success',
                'message' => 'Login successful'
            ];

            if ($registrationData['profile_complete'] == '1') {
                $response['registration_status'] = 'Registration data is complete';
            } else {
                $response['registration_status'] = 'Registration data is not complete';
            }

            if ($registrationData['claims_id'] === NULL) {
                $response['claims_status'] = 'No claim submitted';
            } else {
                $response['claims_status'] = 'Claim active';
            }

            echo json_encode($response);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
        }
    } catch (PDOException $e) {
        file_put_contents('error_log.txt', $e->getMessage() . PHP_EOL, FILE_APPEND);
        echo json_encode(['status' => 'error', 'message' => 'An error occurred. Please try again later.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Email and password are required']);
}
