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
    $contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int)$_SERVER['CONTENT_LENGTH'] : 0;
    $rawInput = file_get_contents("php://input");
    $input = json_decode($rawInput, true);

    if (!$input) {
        $errorMessage = "Invalid JSON payload provided to save-data.php API.";
        
        // Check if payload size exceeded PHP post_max_size or upload limits
        if ($contentLength > 0 && empty($rawInput)) {
            $postMaxSize = ini_get('post_max_size');
            $errorMessage = "Your request payload size is too large (" . round($contentLength / 1024 / 1024, 2) . " MB). This exceeds your cPanel server's PHP 'post_max_size' limit of " . $postMaxSize . ". Please reduce the number or file size of your uploaded gallery photos, or log in to your cPanel, navigate to 'MultiPHP INI Editor' or 'PHP Selector', and increase both 'post_max_size' and 'upload_max_filesize' to at least 32M or 64M.";
        } else if ($rawInput !== "" && json_last_error() !== JSON_ERROR_NONE) {
            $errorMessage = "JSON parsing error on cPanel server: " . json_last_error_msg() . ". Content: " . substr($rawInput, 0, 100) . "...";
        }

        echo json_encode([
            "status" => "error",
            "message" => $errorMessage
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
