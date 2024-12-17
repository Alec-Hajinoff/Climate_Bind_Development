<?php
session_start();
$pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', ''); 
$email = $_POST['email'];
$password = $_POST['password'];
echo '1';
$stmt = $pdo->prepare('SELECT * FROM user_data WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();
echo '2';
if ($user && $password) {
    echo '3';
    $_SESSION['user_id'] = $user['id'];
    echo '4';
    header('Location: localhost:8001/Climate_Bind_Development/login_capture.php'); 
    echo '6';
} else {
    echo 'Invalid email or password.';
}
echo "You are now logged in!"; 
?>