<?php
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
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

$dataFile = dirname(__DIR__) . '/site_data.json';

// Ensure directory is writable when attempting to save
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!is_writable(dirname(__DIR__))) {
        echo json_encode([
            "status" => "error",
            "message" => "Storage directory permissions error: Directory is not writable."
        ]);
        exit();
    }

    $rawInput = file_get_contents("php://input");
    $input = json_decode($rawInput, true);

    if (!$input) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid JSON payload provided to save-data.php API."
        ]);
        exit();
    }

    // Save the entire payload to site_data.json
    $jsonEncoded = json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $saveResult = @file_put_contents($dataFile, $jsonEncoded);

    if ($saveResult !== false) {
        echo json_encode([
            "status" => "success",
            "message" => "All settings and configurations have been successfully saved permanently in cPanel site_data.json file!"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to write content to site_data.json. Check folder permissions."
        ]);
    }
    exit();
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Return all stored configurations from the file
    if (!file_exists($dataFile)) {
        echo json_encode([
            "status" => "success",
            "data" => new stdClass()
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
    exit();
}

// Fallback message
echo json_encode([
    "status" => "success",
    "message" => "save-data.php API is online and listening."
]);
