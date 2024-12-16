<?php
// Database connection details
$servername = "127.0.0.1"; 
$username = "root"; 
$passwordServer = "";
$dbname = "climate_bind"; 

// Create connection
$conn = new mysqli($servername, $username, $passwordServer, $dbname); 

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$premium = $_POST['premium'];
$email = $_POST['email'];
$password = $_POST['password'];
echo "INSERT INTO user_data (email, password, name, premium) VALUES ($email, $password, $name, $premium)";

// Prepare and execute SQL statement
$sql = "INSERT INTO user_data (email, password, name, premium) VALUES ($email, $password, $name, $premium)";    
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss",$email, $password, $name, $premium); 
$stmt->execute();

// Close connection
$stmt->close();
$conn->close();

// Display success message
echo "Data inserted!";
?>