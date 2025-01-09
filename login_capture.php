<?php
if (isset($_POST['email'], $_POST['password'])) {
    echo "1";
    session_start();
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    try {
        echo "2";
        $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        echo "3";
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        echo "3a";
        //var_dump($user);
        //var_dump($password);
        //var_dump($user['password']);
        //var_dump($user['email']);
        //var_dump(password_verify($password, $user['password']));
        if ($user/*['email']*/ && password_verify($password, $user['password'])) {
            echo "4";
            $_SESSION["user_id"] = $user["email"];
            //$response = ['status' => 'success', 'data' => 'Login successful'];
            //file_put_contents('log.txt', json_encode($response) . PHP_EOL, FILE_APPEND);
            //echo json_encode($response);
            header("Location: logged_in_account.html");
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
