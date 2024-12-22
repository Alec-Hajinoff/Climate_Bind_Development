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
    echo "Total premiums committed: " . "£" . $totalPremiumsCommitted . ".\n";
    foreach ($userData as $data) {
        $premium = $data['premium'];
        $premiumPercentage = ($premium / $totalPremiumsCommitted) * 100;
        $claimOne = 100;
        $claimTwo = 200;
        echo "User " . $data['name'] . " paid a premium of " . "£" . $premium . " which is " . $premiumPercentage . "% of the total premiums committed. \n";
        echo "Where a claim is " . "£" . $claimOne . " " . $data['name'] . " will pay out " . $premiumPercentage . "% of " . "£" . $claimOne . " = " . "£" . ($claimOne * $premiumPercentage / 100) . ".\n";
        echo "Where a claim is " . "£" . $claimTwo . " " . $data['name'] . " will pay out " . $premiumPercentage . "% of " . "£" . $claimTwo . " capped at " . $data['name'] . "'s total funds committed " . " = " . "£" . $data['premium'] . ".\n";
        echo "Where there are multiple claims, " . $data['name'] . " will pay out " . $premiumPercentage . "% of each claim, on the first come, first served basis, capped at " . $data['name'] . "'s total funds committed " . " = " . "£" . $data['premium'] . ".\n";
    }
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
