<?php
require_once __DIR__ . '/../core/session_init.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$userId = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("
    SELECT c.product_id, c.quantity, p.name, p.price,
           (SELECT image_path FROM product_images WHERE product_id = p.id LIMIT 1) AS img
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  ");
    $stmt->execute([$userId]);
    $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Fix image paths with base URL
    foreach ($cart as &$item) {
        if (!empty($item['img'])) {
            $item['img'] = $base . $item['img'];
        }
    }

    echo json_encode(['success' => true, 'cart' => $cart]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>