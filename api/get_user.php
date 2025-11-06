<?php
require_once __DIR__ . '/../core/session_init.php';

header('Content-Type: application/json');

// Return user session info if logged in
if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $_SESSION['user_id'],
            "name" => $_SESSION['user_name'],
            "email" => $_SESSION['user_email']
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "User not logged in."
    ]);
}
exit;
