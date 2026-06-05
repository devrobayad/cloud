<?php
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * cPanel Local File Storage Bridge API
 * Handles Reading and Writing configurations and inquiries to a local JSON file on the server.
 * Offers complete dynamic capability without requiring complex MySQL Database setups.
 */

// Allow cross-origin requests (CORS) since admin/frontend might be tested from different environments
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = __DIR__ . '/site_data.json';

// Get raw post data
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!$input && $_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON payload provided to cPanel Storage script."
    ]);
    exit();
}

$action = isset($input['action']) ? $input['action'] : '';

// Ensure directory is writable
if (!is_writable(__DIR__)) {
    echo json_encode([
        "status" => "error",
        "message" => "cPanel directory permissions error: The main directory is not writable. Please change folder permissions (CHMOD) of this folder to 755 in cPanel File Manager."
    ]);
    exit();
}

switch ($action) {
    case 'test':
        // Test connectivity and write permissions of cPanel local storage
        $testWrite = @file_put_contents($dataFile, file_exists($dataFile) ? file_get_contents($dataFile) : '{}');
        if ($testWrite !== false) {
            echo json_encode([
                "status" => "success",
                "message" => "Connection successful! cPanel Local File Storage is active and writable (site_data.json is working perfectly)."
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Writing test failed. Verify file ownership or folder permissions (should be 755 or 777 in extreme lockouts)."
            ]);
        }
        break;

    case 'pull_all':
        // Download all configurations from the server local JSON file
        if (!file_exists($dataFile)) {
            // Return empty data success if not initialized yet
            echo json_encode([
                "status" => "success",
                "data" => []
            ]);
        } else {
            $dataContent = file_get_contents($dataFile);
            $parsedData = json_decode($dataContent, true);
            if ($parsedData === null) {
                echo json_encode([
                    "status" => "error",
                    "message" => "Server site_data.json file contains corrupted or invalid JSON content."
                ]);
            } else {
                echo json_encode([
                    "status" => "success",
                    "data" => $parsedData
                ]);
            }
        }
        break;

    case 'push_all':
        // Overwrite and save all current website configurations
        if (!isset($input['data']) || !is_array($input['data'])) {
            echo json_encode([
                "status" => "error",
                "message" => "System payload dynamic dataset is missing or malformed."
            ]);
            exit();
        }

        $payload = $input['data'];

        // If there are existing inquiries, preserve them if push_all didn't contain them
        if (file_exists($dataFile)) {
            $existing = json_decode(file_get_contents($dataFile), true);
            if (is_array($existing) && isset($existing['ctl_inquiries']) && !isset($payload['ctl_inquiries'])) {
                $payload['ctl_inquiries'] = $existing['ctl_inquiries'];
            }
        }

        $jsonEncoded = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        $saveResult = @file_put_contents($dataFile, $jsonEncoded);

        if ($saveResult !== false) {
            echo json_encode([
                "status" => "success",
                "message" => "Congratulations! All section edits and content layouts have been successfully saved permanently in cPanel Local Storage."
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to write content to cPanel. Verify storage disk space or folder permissions."
            ]);
        }
        break;

    case 'save_inquiry':
        // Saves a customer/visitor inquiry to the local storage list
        if (!isset($input['inquiry']) || !is_array($input['inquiry'])) {
            echo json_encode([
                "status" => "error",
                "message" => "Inquiry record content is missing or invalid."
            ]);
            exit();
        }

        $newInquiry = $input['inquiry'];
        $payload = [];

        if (file_exists($dataFile)) {
            $payload = json_decode(file_get_contents($dataFile), true);
            if (!is_array($payload)) {
                $payload = [];
            }
        }

        if (!isset($payload['ctl_inquiries']) || !is_array($payload['ctl_inquiries'])) {
            $payload['ctl_inquiries'] = [];
        }

        // Prepend the new inquiry
        array_unshift($payload['ctl_inquiries'], $newInquiry);

        $jsonEncoded = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        $saveResult = @file_put_contents($dataFile, $jsonEncoded);

        if ($saveResult !== false) {
            echo json_encode([
                "status" => "success",
                "message" => "Your query has been submitted and stored successfully on our cPanel server!"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to submit query to local server file system. Please try again."
            ]);
        }
        break;

    default:
        // Show status summary for direct visits
        echo json_encode([
            "status" => "success",
            "message" => "Cloud Technologies cPanel Local File Storage script is active and running beautifully.",
            "storage_file_exists" => file_exists($dataFile),
            "storage_file_writable" => is_writable(__DIR__)
        ]);
        break;
}
