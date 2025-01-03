<?php
if (isset($_POST['email'], $_POST['password'])) {
    session_start();

    $email = trim($_POST['email']);
    $password = $_POST['password'];

    try {
        $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $stmt = $pdo->prepare('SELECT * FROM user_data WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            session_regenerate_id(true); // Regenerate session ID for security
            $_SESSION["user_id"] = $user["email"];
            
            $response = ['status' => 'success', 'data' => 'Login successful'];
            file_put_contents('log.txt', json_encode($response) . PHP_EOL, FILE_APPEND);

            header('Location: http://localhost:8001/Climate_Bind_Development/login_capture.php');
            exit();
        } else {
            echo 'Invalid credentials.';
        }
    } catch (PDOException $e) {
        // Log the error message and display a generic error
        file_put_contents('error_log.txt', $e->getMessage() . PHP_EOL, FILE_APPEND);
        echo 'An error occurred. Please try again later.';
    }
}
?>
