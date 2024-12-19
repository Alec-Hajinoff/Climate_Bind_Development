<?php
echo "1";
session_start();
echo "2";
$pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
echo "3";
var_dump($_POST['email']); 
if (isset($_POST['email'], $_POST['password'])) {
    echo "4";
    $stmt = $pdo->prepare('SELECT * FROM user_data WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if ($user && $password) {
        $_SESSION['user_id'] = $user['id'];
        header('Location: http://localhost:8001/Climate_Bind_Development/login_capture.php');
    } else {
        echo 'Invalid email or password.';
    }
}
echo "You are now logged in!";
/*
session_start();
$pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', ''); 
$email = $_POST['email'];
$password = $_POST['password']; 
$stmt = $pdo->prepare('SELECT * FROM user_data WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();
if ($user && $password) {
    $_SESSION['user_id'] = $user['id'];
    header('Location: http://localhost:8001/Climate_Bind_Development/login_capture.php'); 
} else {
    echo 'Invalid email or password.';
}
echo "You are now logged in!";
*/
?>