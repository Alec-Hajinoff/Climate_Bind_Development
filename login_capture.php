<?php
$servername = "127.0.0.1";
$username = "root";
$passwordServer = "";
$dbname = "climate_bind";
$conn = new mysqli($servername, $username, $passwordServer, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$name = $_POST['name'];
$premium = $_POST['premium'];
$email = $_POST['email'];
$password = $_POST['password'];
$sql = "INSERT INTO user_data (email, password, name, premium) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $email, $password, $name, $premium);
$stmt->execute();
$stmt->close();
$conn->close();
echo "Data inserted!";
?>