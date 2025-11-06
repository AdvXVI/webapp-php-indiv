<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

$response = ["success" => false, "message" => "Unknown error occurred."];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $slug = trim($_POST['slug'] ?? '');
    $name = trim($_POST['name'] ?? '');
    $price = trim($_POST['price'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $genresInput = trim($_POST['genres'] ?? '');

    $uploadDir = __DIR__ . '/../public/prod_img/';
    if (!is_dir($uploadDir))
        mkdir($uploadDir, 0777, true);

    try {
        // Validate required fields
        if (!$slug || !$name || !$price || !$description || !$genresInput)
            throw new Exception("Please fill out all required fields.");

        // Begin transaction
        $pdo->beginTransaction();

        // Insert product
        $stmt = $pdo->prepare("INSERT INTO products (slug, name, price, description) VALUES (?, ?, ?, ?)");
        $stmt->execute([$slug, $name, $price, $description]);
        $productId = $pdo->lastInsertId();

        // Handle genres
        $genresArray = array_map('trim', explode(',', $genresInput));
        $genresArray = array_filter($genresArray, fn($g) => $g !== '');
        foreach ($genresArray as $genreName) {
            $checkStmt = $pdo->prepare("SELECT id FROM genres WHERE name = ?");
            $checkStmt->execute([$genreName]);
            $genreId = $checkStmt->fetchColumn();

            if (!$genreId) {
                $insertGenre = $pdo->prepare("INSERT INTO genres (name) VALUES (?)");
                $insertGenre->execute([$genreName]);
                $genreId = $pdo->lastInsertId();
            }

            $linkStmt = $pdo->prepare("INSERT INTO product_genres (product_id, genre_id) VALUES (?, ?)");
            $linkStmt->execute([$productId, $genreId]);
        }

        // Handle multiple image uploads
        if (empty($_FILES['images']['name'][0])) {
            throw new Exception("At least one product image is required.");
        }

        $counter = 1;
        foreach ($_FILES['images']['name'] as $key => $fileName) {
            $tmpName = $_FILES['images']['tmp_name'][$key];
            $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            $finalName = $slug . ($counter > 1 ? "_{$counter}" : "") . '.' . $ext;
            $destination = $uploadDir . $finalName;

            if (!move_uploaded_file($tmpName, $destination)) {
                throw new Exception("Failed to upload image: $fileName");
            }
            $imagePath = '/public/prod_img/' . $finalName;

            $imgStmt = $pdo->prepare("INSERT INTO product_images (product_id, image_path) VALUES (?, ?)");
            $imgStmt->execute([$productId, $imagePath]);

            $counter++;
        }

        // Commit all changes
        $pdo->commit();

        $response = [
            "success" => true,
            "message" => "✅ Product successfully added!",
            "product_id" => $productId,
        ];

    } catch (Exception $e) {
        //  Rollback everything
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        foreach ($uploadedFiles as $filePath) {
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        http_response_code(400);
        $response = [
            "success" => false,
            "message" => "❌ Error: " . $e->getMessage()
        ];
    }
} else {
    http_response_code(405);
    $response = [
        "success" => false,
        "message" => "Invalid request method."
    ];
}

echo json_encode($response);
exit;
