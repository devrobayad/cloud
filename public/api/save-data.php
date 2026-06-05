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

$dataFileA = dirname(__DIR__) . '/site_data.json';
$dataFileB = __DIR__ . '/site_data.json';

// Ensure directory is writable when attempting to save
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
    
    // Attempt writing to Location A (parent folder)
    $saveResult = @file_put_contents($dataFileA, $jsonEncoded);
    $savedPath = 'Parent directory (site_data.json)';
    
    // If Location A failed or is not available, try Location B (local api folder)
    if ($saveResult === false) {
        $saveResult = @file_put_contents($dataFileB, $jsonEncoded);
        $savedPath = 'Local API directory (api/site_data.json)';
    }

    if ($saveResult !== false) {
        echo json_encode([
            "status" => "success",
            "message" => "All settings and configurations have been successfully saved permanently in cPanel " . $savedPath . "!"
        ]);
    } else {
        $phpUser = function_exists('get_current_user') ? get_current_user() : 'unknown';
        echo json_encode([
            "status" => "error",
            "message" => "Failed to write content to site_data.json. Check folder permissions. Current PHP User: " . $phpUser . ". Please change folder permissions of root and 'api' folder to 755 or 777."
        ]);
    }
    exit();
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Return all stored configurations from the file
    $dataContent = '';
    if (file_exists($dataFileA)) {
        $dataContent = @file_get_contents($dataFileA);
    } else if (file_exists($dataFileB)) {
        $dataContent = @file_get_contents($dataFileB);
    }

    if (empty($dataContent)) {
        echo json_encode([
            "status" => "success",
            "data" => new stdClass()
        ]);
    } else {
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
