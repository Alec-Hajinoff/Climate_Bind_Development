<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

try {

    $pdo = new PDO('mysql:host=localhost;dbname=climate_bind', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $response = [];

    $user_id = $_SESSION['id'] ?? null;

    if ($user_id) {
        $stmt = $pdo->prepare('SELECT claims_payor_id, claims_payor_amount FROM users WHERE id = ?');
        $stmt->execute([$user_id]);
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($userData && isset($userData['claims_payor_id'])) {
            $claims_payor_id = $userData['claims_payor_id'];
            $claims_payor_amount = $userData['claims_payor_amount'] ?? 0;

            $stmt = $pdo->prepare('SELECT address, first_name, last_name, email, phone, claim_doc_id FROM users WHERE claims_id = ?');
            $stmt->execute([$claims_payor_id]);
            $matchingUser = $stmt->fetch(PDO::FETCH_ASSOC);

            $stmt = $pdo->prepare('SELECT
                incident_time_date,
                claim_submission_date,
                damage_loss_cause,
                damaged_items_list,
                replacement_value,
                contractor_repair_estimates,
                claim_amount,
                bank_account_number_claim
                FROM claims
                WHERE id = ?');
            $stmt->execute([$claims_payor_id]);
            $claimData = $stmt->fetch(PDO::FETCH_ASSOC);

            $claimDocuments = null;
            if ($matchingUser && isset($matchingUser['claim_doc_id'])) {
                $claim_doc_id = $matchingUser['claim_doc_id'];
                $stmt = $pdo->prepare('SELECT local_authority_report, photographs, damaged_items_receipts FROM claim_documents WHERE id = ?');
                $stmt->execute([$claim_doc_id]);
                $claimDocuments = $stmt->fetch(PDO::FETCH_ASSOC);
            }

            if (
                $matchingUser &&
                isset($matchingUser['address']) &&
                isset($matchingUser['first_name']) &&
                isset($matchingUser['last_name']) &&
                isset($matchingUser['email']) &&
                isset($matchingUser['phone']) &&
                $claimData
            ) {

                $response = [
                    'status' => 'success',
                    'message' => 'Matching user and claim information found',
                    'address' => $matchingUser['address'],
                    'full_name' => $matchingUser['first_name'] . ' ' . $matchingUser['last_name'],
                    'email' => $matchingUser['email'],
                    'phone' => $matchingUser['phone'],
                    'claims_payor_amount' => $claims_payor_amount,

                    'claim_data' => [
                        'incident_date' => $claimData['incident_time_date'] ?? 'N/A',
                        'submission_date' => $claimData['claim_submission_date'] ?? 'N/A',
                        'damage_cause' => $claimData['damage_loss_cause'] ?? 'N/A',
                        'damaged_items' => $claimData['damaged_items_list'] ?? 'N/A',
                        'replacement_value' => $claimData['replacement_value'] ?? 0,
                        'claim_amount' => $claimData['claim_amount'] ?? 0,
                        'bank_account' => $claimData['bank_account_number_claim'] ?? 'N/A'
                    ],

                    'claim_documents' => $claimDocuments ? [
                        'local_authority_report' => base64_encode($claimDocuments['local_authority_report']),
                        'photographs' => base64_encode($claimDocuments['photographs']),
                        'damaged_items_receipts' => base64_encode($claimDocuments['damaged_items_receipts'])
                    ] : null
                ];
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'User or claim information is incomplete or missing'
                ];
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'No claims_payor_id found for the current user'
            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'User not logged in or session expired'
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} catch (PDOException $e) {
    $errorResponse = [
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ];

    header('Content-Type: application/json');
    echo json_encode($errorResponse);
}
?>