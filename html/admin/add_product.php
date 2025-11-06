<?php require_once __DIR__ . '/../../core/session_init.php'; ?>

<!DOCTYPE html>
<html lang="en">

<?php include '../partials/header_admin.php'; ?>

<body class="bg-dark text-white py-4">

    <?php include '../partials/alert.php'; ?>

    <div class="container">
        <h1 class="mb-4">🕹 Add New Product</h1>

        <form id="addProductForm" action="" method="POST" enctype="multipart/form-data" class="bg-secondary p-4 rounded">
            <div class="mb-3">
                <label for="slug" class="form-label">Slug (unique ID)</label>
                <input type="text" name="slug" id="slug" class="form-control" placeholder="e.g. gta" required>
            </div>

            <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="e.g. Grand Theft Auto"
                    required>
            </div>

            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" name="price" id="price" class="form-control" step="0.01" placeholder="e.g. 350"
                    required>
            </div>

            <div class="mb-3">
                <label for="genres" class="form-label">Genre</label>
                <input type="text" name="genres" id="genres" class="form-control"
                    placeholder="e.g. Action, RPG, Open World" required>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea name="description" id="description" class="form-control" rows="4" required></textarea>
            </div>

            <div class="mb-3">
                <label for="images" class="form-label">Upload Images</label>
                <input type="file" name="images[]" id="images" class="form-control" accept="image/*" multiple required>
                <small class="text-light">You can select multiple files.</small>
            </div>

            <button type="submit" class="btn btn-success">Add Product</button>
        </form>
    </div>

    <?php include '../partials/script_admin.php'; ?>
</body>

</html>