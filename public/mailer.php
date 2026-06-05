<?php
/**
 * Elegant cPanel-Compatible Mailer Script
 * Generated dynamically for Cloud Technologies Limited
 * 
 * This file handles JSON POST submissions from the React frontend and sends
 * emails using native PHP mail() or custom configurations.
 */

// 1. Prevent direct browser access with GET (unless debugging)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: text/html; charset=utf-8');
    echo "<div style='font-family: sans-serif; text-align: center; margin-top: 10%; padding: 20px; color: #333;'>";
    echo "<h2>✉️ Cloud Technologies Limited Mailer Endpoint</h2>";
    echo "<p>This PHP endpoint is active and waiting to process secure JSON data submissions.</p>";
    echo "<span style='font-size: 11px; background: #eee; padding: 5px 10px; border-radius: 4px; font-family: monospace;'>METHOD: JSON POST only</span>";
    echo "</div>";
    exit;
}

// 2. Setup CORS headers to allow requests from the React application
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 3. Load input payload from php://input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    echo json_encode([
        "status" => "error",
        "message" => "No input data received or invalid JSON payload."
    ]);
    exit;
}

// 4. Default configuration parameters (Overwritten by local config or dynamically managed)
// The cPanel system can store configuration in a separate config file or directly edit here.
$configFile = __DIR__ . '/mailer_config.json';
$config = [
    "receiverEmail" => "info@cloudtechnologies.com.bd",
    "senderEmail" => "noreply@cloudtechnologies.com.bd",
    "senderName" => "Cloud Technologies CRM Portal",
    "subjectPrefix" => "[CTL Website Inquiry] ",
    "useSmtp" => false
];

if (file_exists($configFile)) {
    $localConfig = json_decode(file_get_contents($configFile), true);
    if ($localConfig) {
        $config = array_merge($config, $localConfig);
    }
}

// 5. Extract form fields
$fullName = isset($input['fullName']) ? strip_tags(trim($input['fullName'])) : '';
$companyName = isset($input['companyName']) ? strip_tags(trim($input['companyName'])) : 'Not Provided';
$corporateEmail = isset($input['corporateEmail']) ? filter_var(trim($input['corporateEmail']), FILTER_VALIDATE_EMAIL) : '';
$mobilePhone = isset($input['mobilePhone']) ? strip_tags(trim($input['mobilePhone'])) : '';
$requirementDetails = isset($input['requirementDetails']) ? strip_tags(trim($input['requirementDetails'])) : '';

// Career forms or other fields may map automatically
if (empty($fullName)) { $fullName = isset($input['name']) ? strip_tags(trim($input['name'])) : ''; }
if (empty($corporateEmail)) { $corporateEmail = isset($input['email']) ? filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL) : ''; }
if (empty($mobilePhone)) { $mobilePhone = isset($input['phone']) ? strip_tags(trim($input['phone'])) : ''; }
if (empty($requirementDetails)) { $requirementDetails = isset($input['message']) ? strip_tags(trim($input['message'])) : ''; }

if (empty($fullName) || empty($corporateEmail)) {
    echo json_encode([
        "status" => "error",
        "message" => "Name and valid Email address are required fields."
    ]);
    exit;
}

// 6. Build Plain Text & HTML email bodies
$subject = $config['subjectPrefix'] . " New Message from " . $fullName;

$htmlMessage = "
<html>
<head>
  <title>{$subject}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; color: #333333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .header { background-color: #0f0e26; color: #ffffff; padding: 30px; text-align: center; }
    .header h2 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #6366f1; }
    .header p { margin: 5px 0 0; font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
    .content { padding: 40px; }
    .field-row { display: flex; border-bottom: 1px solid #f1f5f9; padding: 12px 0; }
    .field-label { width: 30%; font-weight: bold; font-size: 12px; color: #64748b; text-transform: uppercase; tracking: 0.5px; }
    .field-value { width: 70%; font-size: 14px; color: #1e293b; font-weight: 500; }
    .message-box { background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 20px; border-radius: 8px; margin-top: 25px; line-height: 1.6; }
    .footer { text-align: center; padding: 25px; background-color: #f8fafc; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h2>CLOUD TECHNOLOGIES</h2>
      <p>Enterprise Inquiry Notification</p>
    </div>
    <div class='content'>
      <div class='field-row'>
        <div class='field-label'>Full Name</div>
        <div class='field-value'>{$fullName}</div>
      </div>
      <div class='field-row'>
        <div class='field-label'>Company</div>
        <div class='field-value'>{$companyName}</div>
      </div>
      <div class='field-row'>
        <div class='field-label'>Email</div>
        <div class='field-value'>{$corporateEmail}</div>
      </div>
      <div class='field-row'>
        <div class='field-label'>Phone</div>
        <div class='field-value'>{$mobilePhone}</div>
      </div>
      
      <div style='margin-top: 25px;'>
        <div class='field-label' style='width: 100%; margin-bottom: 8px;'>Inquiry / Requirement Details:</div>
        <div class='message-box'>
          " . nl2br(htmlspecialchars($requirementDetails)) . "
        </div>
      </div>
    </div>
    <div class='footer'>
      This inquiry was captured securely on " . date('Y-m-d H:i:s') . " (UTC) from client IP: {$_SERVER['REMOTE_ADDR']}.<br/>
      Proudly Powered by Cloud Technologies Ltd (CTL Bangladesh). All rights reserved.
    </div>
  </div>
</body>
</html>
";

// 7. Send the email using PHP's native mail() function
// We configure suitable headers to minimize spam folder deliveries
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $config['senderName'] . " <" . $config['senderEmail'] . ">" . "\r\n";
$headers .= "Reply-To: " . $fullName . " <" . $corporateEmail . ">" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Attempt delivery
if (mail($config['receiverEmail'], $subject, $htmlMessage, $headers)) {
    echo json_encode([
        "status" => "success",
        "message" => "Your message was sent successfully and our team has been notified!"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "An error occurred in cPanel's local mail transfer system. Please verify mail configuration."
    ]);
}
?>
