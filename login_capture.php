<?php
session_start();
$email = $_POST['email'];
$password = $_POST['password'];

// Database connection (using PDO for security)
$pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', ''); 

$stmt = $pdo->prepare('SELECT * FROM user_data WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password)) {
    $_SESSION['user_id'] = $user['id'];
    // Redirect to a logged-in page
    header('Location: http://localhost:8001/Climate_Bind_Development/login_capture.php');
} else {
    // Display an error message
    echo 'Invalid email or password.';
}
echo "You are now logged in!"; 
?>