<?php
if (isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    session_start();
    $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
    $stmt = $pdo->prepare('SELECT * FROM user_data WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if ($user && $user['password'] === $password) {
        $_SESSION["user_id"] = $user["email"];
        header('Location: http://localhost:8001/Climate_Bind_Development/login_capture.php');
        $response = ['status' => 'success', 'data' => 'Test data'];
        file_put_contents('log.txt', json_encode($response) . PHP_EOL, FILE_APPEND);
        echo json_encode($response);
        exit();
    } else {
        echo 'Invalid email or password.';
    }
}
?>
<?php
try {
    // Connection
    $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query
    $stmt = $pdo->prepare('SELECT * FROM premium_data WHERE user_id = ?');
    $userId = 1; // Example
    $stmt->execute([$userId]);

    // Fetch the data
    $premiumData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculations
    $totalPremium = 0;
    foreach ($premiumData as $data) {
        $totalPremium += $data['premium_amount'];
    }

    // Output
    echo "Total Premium: " . $totalPremium;
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>