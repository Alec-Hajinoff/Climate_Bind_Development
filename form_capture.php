<?php
echo "1";
$servername = "127.0.0.1";
$username = "root";
$passwordServer = "";
$dbname = "climate_bind";
$conn = new mysqli($servername, $username, $passwordServer, $dbname);
echo "2";
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "3";
$name = $_POST['name']; 
//$premium = $_POST['premium'];
$email = $_POST['email'];
$password = $_POST['password'];
echo "4";
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO user_data (email, password, name /* premium */) VALUES (?, ?, ? /* ? */)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $email, $hashedPassword, $name /* $premium */); /*If "premium" is used, the "sss" value on line 16 must include "i" to be "sssi"*/
$stmt->execute();
$stmt->close();
$conn->close();
echo "Reached header()";
header("Location: registered_login.php"); 
exit();
//echo "Data inserted!"; 
