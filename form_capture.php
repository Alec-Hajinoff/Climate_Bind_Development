<?php
// Database connection details
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$premium = $_POST['premium'];
$email = $_POST['email'];
$password = $_POST['password'];

// Prepare and execute SQL statement
$sql = "INSERT INTO your_table_name (name, email) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $name, $email);
$stmt->execute();

// Close connection
$stmt->close();
$conn->close();

// Display success message
echo "Data inserted!";
?>