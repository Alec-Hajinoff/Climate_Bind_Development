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
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION["user_id"] = $user["email"];
            header("Location: logged_in_account.html");
            exit();
        } else {
            echo 'Invalid credentials.';
        }
    } catch (PDOException $e) {
        file_put_contents('error_log.txt', $e->getMessage() . PHP_EOL, FILE_APPEND);
        echo 'An error occurred. Please try again later.';
    }
}
