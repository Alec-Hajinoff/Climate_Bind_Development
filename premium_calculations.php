<?php
try {
    // Connection
    $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query
    $stmt = $pdo->prepare('SELECT premium FROM user_data');
    $stmt->execute();

    // Fetch the data
    $premiumData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculations
    $totalPremium = 0;
    foreach ($premiumData as $data) {
        $totalPremium += $data['premium'];
    }

    // Output
    echo "Total Premium: " . $totalPremium;
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>