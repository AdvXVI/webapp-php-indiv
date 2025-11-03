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

if ($productId <= 0 || $qty <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?");
    $stmt->execute([$qty, $userId, $productId]);

    echo json_encode(['success' => true, 'message' => 'Cart updated']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>