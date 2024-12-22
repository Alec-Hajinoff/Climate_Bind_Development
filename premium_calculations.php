<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('SELECT * FROM user_data'); 
    $stmt->execute();
    $userData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $totalPremiumsCommitted = 0;
    foreach ($userData as $data) { 
        $totalPremiumsCommitted += $data['premium'];
    }
    echo "Total premiums committed: " . $totalPremiumsCommitted;
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?> 