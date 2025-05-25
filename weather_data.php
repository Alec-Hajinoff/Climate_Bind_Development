<?php
/* Call to api.openweathermap.org to fetch weather data*/
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);
$url = 'https://api.openweathermap.org/data/2.5/weather?lat=51.635994&lon=-0.090019535&appid=5b25b2d29d964e323a4673212fa148e5';
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);
$tempKelvin = $decode['main']['temp'];
$tempCelsius = $tempKelvin - 273.15;

//Insert temperature value into database
require_once 'session_config.php';
try {
    $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $stmt = $pdo->prepare('INSERT INTO readings (value) VALUES (:temperature)'); //'readings' is the name of the table, 'value' is the column name, '(:temperature)' is a placeholder for the temperature value
    $stmt->bindParam(':temperature', $tempCelsius);
    $stmt->execute();

    $output = array(
        'status' => 'success',
        'message' => 'Temperature inserted successfully',
        'temperature' => $tempCelsius
    );
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
} catch (PDOException $e) {
    $output = array(
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    );
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
} finally {
    $pdo = null;
}
?>