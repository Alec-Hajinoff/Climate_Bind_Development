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

            $stmt = $pdo->prepare('SELECT phone, last_name, address, date_of_birth, national_insurance, passport_copy FROM users WHERE id = ?');
            $stmt->execute([$user['id']]);
            $registrationData = $stmt->fetch();

            // New query to check properties table
            $stmt = $pdo->prepare('SELECT images, ownership_proof, date_of_construction, square_footage, type_home, building_materials, number_levels, roof_type, heating_systems, safety_features, home_renovations, mortgage_lender, current_previous_insurance, list_previous_disasters FROM properties WHERE user_id = ?');
            $stmt->execute([$user['id']]);
            $propertyData = $stmt->fetch();

            if (
                !empty($registrationData['phone']) && !empty($registrationData['last_name']) &&
                !empty($registrationData['address']) && !empty($registrationData['date_of_birth']) &&
                !empty($registrationData['national_insurance']) && !empty($registrationData['passport_copy']) &&
                // Check if all property data is complete
                !empty($propertyData['images']) && !empty($propertyData['ownership_proof']) &&
                !empty($propertyData['date_of_construction']) && !empty($propertyData['square_footage']) &&
                !empty($propertyData['type_home']) && !empty($propertyData['building_materials']) &&
                !empty($propertyData['number_levels']) && !empty($propertyData['roof_type']) &&
                !empty($propertyData['heating_systems']) && !empty($propertyData['safety_features']) &&
                !empty($propertyData['home_renovations']) && !empty($propertyData['mortgage_lender']) &&
                !empty($propertyData['current_previous_insurance']) && !empty($propertyData['list_previous_disasters'])
            ) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Login successful',
                    'registration_status' => 'Registration data is complete'
                ]);
            } else {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Login successful',
                    'registration_status' => 'Registration data is not complete'
                ]);
            }
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
/* Working code:
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

            $stmt = $pdo->prepare('SELECT phone, last_name, address, date_of_birth, national_insurance, passport_copy FROM users WHERE id = ?');
            $stmt->execute([$user['id']]);
            $registrationData = $stmt->fetch();

            if (
                !empty($registrationData['phone']) && !empty($registrationData['last_name']) &&
                !empty($registrationData['address']) && !empty($registrationData['date_of_birth']) &&
                !empty($registrationData['national_insurance']) && !empty($registrationData['passport_copy'])
            ) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Login successful',
                    'registration_status' => 'Registration data is complete'
                ]);
            } else {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Login successful',
                    'registration_status' => 'Registration data is not complete'
                ]);
            }
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
*/
?>
