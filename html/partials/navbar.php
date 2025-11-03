<?php require_once __DIR__ . '/../../core/session_init.php'; ?>

<!-- NAVBAR -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand linktest" href="home.php">JazStation</a>
    <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link linktest" href="home.php">Home</a></li>
        <li class="nav-item"><a class="nav-link linktest" href="products.php">Games</a></li>
        <li class="nav-item"><a class="nav-link linktest" href="about.php">About</a></li>
        <li class="nav-item"><a class="nav-link linktest" href="contact.php">Contact</a></li>
        <li class="nav-item"><a class="nav-link linktest" href="cart.php">🛒 Cart</a></li>

        <li class="nav-item d-flex align-items-center">
          <?php if (isset($_SESSION['user_id'])): ?>
            <div class="d-flex align-items-center">
              <div class="d-flex flex-column align-items-end me-2">
                <span><?= htmlspecialchars($_SESSION['user_name']) ?></span>
                <small class="text-light"><?= htmlspecialchars($_SESSION['user_email']) ?></small>
              </div>
              <a href="#" id="logout-btn" data-action="logout" class="btn btn-sm btn-outline-danger">Logout</a>
            </div>
          <?php else: ?>
            <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
          <?php endif; ?>
        </li>
      </ul>
    </div>
  </div>
</nav>