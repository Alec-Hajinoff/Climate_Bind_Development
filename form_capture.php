<?php
require "vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$name = $_POST["name"];
$email = $_POST["email"];
$number = $_POST["number"];
$message = $_POST["message"];
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'localhost';
$mail->Port = 25;
$mail->SMTPAuth = false;
$mail->SMTPSecure = false;
$mail->setFrom("team@climatebind.com");  
$mail->addAddress("team@climatebind.com");
$mail->Subject = "Contact Form Submission";
$mail->Body = "Message: " . $message . "\nPhone: " . $number . "\nEmail: " . $email . "\nName: " . $name; 
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';
$mail->send();
echo "Email sent successfully.";
?>