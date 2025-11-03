<?php
require_once __DIR__ . '/../core/session_init.php';
require_once __DIR__ . '/../db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$productId = intval($data['product_id'] ?? 0);
$qty = intval($data['qty'] ?? 1);
$userId = $_SESSION['user_id'];

if ($productId <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid product ID']);
    exit;
}

try {
    // Insert or update (thanks to UNIQUE constraint)
    $stmt = $pdo->prepare("
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  ");
    $stmt->execute([$userId, $productId, $qty]);

    echo json_encode(['success' => true, 'message' => 'Item added to cart']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>