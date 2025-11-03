//TODO: fix
//wip - dont touch

$(function () {
  console.log("script_cart.js loaded!");


  // Fetch cart from DB
  async function fetchCartFromDB() {
    if (!isLoggedIn) return [];
    try {
      const res = await fetch(`${BASE_URL}/api/get_cart.php`);
      const data = await res.json();
      if (data.success) return data.cart;
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
    return [];
  }

  // Add to cart (DB)
  async function addToCartDB(productId, qty = 1) {
    if (!isLoggedIn) {
      showAlert("Please log in to add items to your cart.", "warning");
      const loginModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("loginModal"));
      loginModal.show();
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/add_to_cart.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, qty })
      });
      const data = await res.json();
      if (data.success) {
        showAlert("Added to cart!", "success");
        renderCart();
      } else {
        showAlert(data.message || "Failed to add to cart.", "danger");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  }

  // Remove item from cart (DB)
  async function removeFromCartDB(productId) {
    try {
      const res = await fetch(`${BASE_URL}/api/remove_from_cart.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId })
      });
      const data = await res.json();
      if (data.success) renderCart();
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  }

  // Update quantity (DB)
  async function updateCartQtyDB(productId, qty) {
    try {
      const res = await fetch(`${BASE_URL}/api/update_cart.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, qty })
      });
      const data = await res.json();
      if (data.success) renderCart();
    } catch (err) {
      console.error("Update cart error:", err);
    }
  }

  // Render cart
  async function renderCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalDiv = document.getElementById("cart-total");
    const btnRow = document.getElementById("checkout-btn-row");
    if (!cartItemsDiv) return;

    await checkLoginStatus();

    if (!isLoggedIn) {
      cartItemsDiv.innerHTML = `<p class="text-center">Please log in to view your cart.</p>`;
      cartTotalDiv.innerHTML = "";
      if (btnRow) btnRow.classList.add("d-none");
      return;
    }

    const cart = await fetchCartFromDB();
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = `<p class="text-center">Your cart is empty 😢</p>`;
      cartTotalDiv.innerHTML = "";
      if (btnRow) btnRow.classList.add("d-none");
      return;
    }

    let html = `<table class="table table-dark table-striped align-middle">
    <thead>
      <tr>
        <th>Game</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Subtotal</th>
        <th></th>
      </tr>
    </thead>
    <tbody>`;
    let total = 0;
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      html += `<tr>
      <td>
        <img src="${item.img}" alt="${item.name}" style="width:40px;height:40px;object-fit:cover;margin-right:8px;">
        ${item.name}
      </td>
      <td>₱${item.price}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" data-id="${item.product_id}" class="cart-qty form-control form-control-sm" style="width:70px;">
      </td>
      <td>₱${subtotal}</td>
      <td>
        <button class="btn btn-danger btn-sm cart-remove" data-id="${item.product_id}">Remove</button>
      </td>
    </tr>`;
    });
    html += `</tbody></table>`;
    cartItemsDiv.innerHTML = html;
    cartTotalDiv.innerHTML = `<h4>Total: ₱${total}</h4>`;
    if (btnRow) btnRow.classList.remove("d-none");

    // Quantity change
    cartItemsDiv.querySelectorAll(".cart-qty").forEach(input => {
      input.addEventListener("change", e => {
        const id = parseInt(input.dataset.id);
        const qty = Math.max(1, Math.min(99, parseInt(input.value) || 1));
        updateCartQtyDB(id, qty);
      });
    });

    // Remove item
    cartItemsDiv.querySelectorAll(".cart-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        removeFromCartDB(id);
      });
    });
  }

  
});