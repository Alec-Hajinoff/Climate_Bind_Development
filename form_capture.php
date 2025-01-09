<?php
$servername = "127.0.0.1";
$username = "root";
$passwordServer = "";
$dbname = "climate_bind";
$conn = new mysqli($servername, $username, $passwordServer, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$name = $_POST['first_name'];
//$name = $_POST['name'];
//$premium = $_POST['premium'];
$email = $_POST['email'];
$password = $_POST['password'];
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (email, password, first_name /* premium */) VALUES (?, ?, ? /* ? */)";
//$sql = "INSERT INTO user_data (email, password, name /* premium */) VALUES (?, ?, ? /* ? */)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $email, $hashedPassword, $name /* $premium */); /*If "premium" is used, the "sss" value on line 16 must include "i" to be "sssi"*/
$stmt->execute();
$stmt->close();
$conn->close();
echo "Success";
//header("Location: registered_login.html"); 
//exit();
