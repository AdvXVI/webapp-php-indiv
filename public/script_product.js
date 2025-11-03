//TODO: fix
//wip - dont touch

$(function () {
  console.log("script_product.js loaded!");

  // --- Overview Modal ---
  const overviewModal = document.getElementById("overviewModal");
  const overviewModalLabel = document.getElementById("overviewModalLabel");
  const overviewCarouselInner = document.getElementById("overview-carousel-inner");
  const overviewGenre = document.getElementById("overview-genre");
  const overviewDescription = document.getElementById("overview-description");
  const overviewPrice = document.getElementById("overview-price");
  const overviewAddToCart = document.getElementById("overview-add-to-cart");
  const overviewCarouselPreviews = document.getElementById("overview-carousel-previews");
  let currentOverviewProductId = null;
  let productData = {};
  let genresList = [];
  let currentGenre = "all";
  let currentSort = "az";
  const sortSelect = document.getElementById("product-sort");

  // Add Sort dropdown listener
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentSort = sortSelect.value;
      renderProductsSection(currentGenre, currentSort);
    });
  }

  function renderProductCategories() {
    const categoriesDiv = document.getElementById('product-categories');
    if (!categoriesDiv) return;

    categoriesDiv.innerHTML = `
    <div class="d-inline-flex flex-wrap gap-2 justify-content-center">
      <button class="btn btn-outline-primary btn-sm category-btn active" data-genre="all">All</button>
      ${genresList.map(g =>
      `<button class="btn btn-outline-primary btn-sm category-btn" data-genre="${g}">${g}</button>`
    ).join('')}
    </div>
  `;

    categoriesDiv.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        categoriesDiv.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentGenre = btn.getAttribute('data-genre');
        renderProductsSection(currentGenre, currentSort);
      });
    });
  }

  function renderProductsSection(filterGenre = "all", sortBy = "az") {
    const productsList = document.getElementById('products-list');
    if (!productsList) return;

    let entries = Object.entries(productData);

    // Filter
    if (filterGenre !== "all") {
      entries = entries.filter(([id, data]) => {
        if (Array.isArray(data.genres)) {
          return data.genres.includes(filterGenre);
        }
        return false;
      });
    }

    // Sort
    entries.sort(([, a], [, b]) => {
      switch (sortBy) {
        case "az": return a.name.localeCompare(b.name);
        case "za": return b.name.localeCompare(a.name);
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        default: return 0;
      }
    });

    // Render cards
    productsList.innerHTML = entries.map(([id, data]) => `
    <div class="col-md-4">
      <div class="card h-100">
        <div class="ratio ratio-1x1">
          <img src="${data.images[0]}" class="card-img-top object-fit-cover rounded" alt="${data.name}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">₱${data.price}</p>
          <a href="/" class="btn btn-primary w-100 overview-btn" data-product-id="${id}">Overview</a>
          <a href="/" class="btn btn-secondary w-100 add-to-cart" data-product-id="${id}">Add to Cart</a>
        </div>
      </div>
    </div>
  `).join('');

    attachProductEventListeners();
    attachOverviewModalListeners();
  }

  function attachProductEventListeners() {
    // Add to Cart handler (Products section)
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.onclick = null;
      btn.addEventListener("click", e => {
        e.preventDefault();
        const productId = btn.getAttribute("data-product-id");
        const data = productData[productId];
        if (!data) return;
        const existing = cart.find(item => item.name === data.name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name: data.name, price: data.price, img: data.images[0], qty: 1 });
        }
        renderCart();
        goToPage("cart");
      });
    });
  }

  function attachOverviewModalListeners() {
    // Remove previous listeners to avoid duplicates
    document.querySelectorAll(".overview-btn").forEach(btn => {
      btn.onclick = null;
      btn.addEventListener("click", e => {
        e.preventDefault();
        const productId = btn.getAttribute("data-product-id");
        const data = productData[productId];
        if (!data) return;

        // Title
        overviewModalLabel.textContent = data.name;

        // Carousel (16:9 ratio for each image)
        overviewCarouselInner.innerHTML = data.images.map((img, idx) =>
          `<div class="carousel-item${idx === 0 ? " active" : ""}">
            <div class="ratio ratio-16x9">
              <img src="${img}" class="d-block w-100 rounded" alt="${data.name} image ${idx + 1}" style="object-fit:cover;">
            </div>
          </div>`
        ).join("");

        // Previews below carousel
        if (overviewCarouselPreviews) {
          overviewCarouselPreviews.innerHTML = data.images.map((img, idx) =>
            `<img src="${img}" data-idx="${idx}" alt="Preview ${idx + 1}" class="${idx === 0 ? "active" : ""}">`
          ).join("");
        }

        // Preview click: jump to carousel slide
        if (overviewCarouselPreviews) {
          overviewCarouselPreviews.querySelectorAll("img").forEach((img, idx) => {
            img.onclick = () => {
              const carousel = window.bootstrap && window.bootstrap.Carousel
                ? bootstrap.Carousel.getOrCreateInstance(document.getElementById("overviewCarousel"))
                : null;
              if (carousel) carousel.to(idx);
              setActivePreview(idx);
            };
          });
        }

        // --- Sync preview highlight on carousel slide ---
        const carouselElem = document.getElementById("overviewCarousel");
        if (carouselElem) {
          // Remove previous event listeners to avoid stacking
          carouselElem._previewSyncHandler && carouselElem.removeEventListener("slid.bs.carousel", carouselElem._previewSyncHandler);
          carouselElem._previewSyncHandler = function () {
            const items = Array.from(overviewCarouselInner.querySelectorAll(".carousel-item"));
            const idx = items.findIndex(item => item.classList.contains("active"));
            setActivePreview(idx);
          };
          carouselElem.addEventListener("slid.bs.carousel", carouselElem._previewSyncHandler);
        }

        // Reset carousel to first slide
        if (window.bootstrap && window.bootstrap.Carousel) {
          try {
            const carousel = bootstrap.Carousel.getOrCreateInstance(document.getElementById("overviewCarousel"));
            carousel.to(0);
          } catch { }
        }

        // Genre, Description, Price
        overviewGenre.textContent = data.genre;
        overviewDescription.textContent = data.description;
        overviewPrice.textContent = `₱${data.price}`;

        // Store current product id for add to cart
        currentOverviewProductId = productId;

        // Show modal
        if (window.bootstrap && window.bootstrap.Modal) {
          const modal = bootstrap.Modal.getOrCreateInstance(overviewModal);
          modal.show();
        }
      });
    });

    // Add to Cart from Overview Modal
    if (overviewAddToCart) {
      overviewAddToCart.onclick = () => {
        if (!currentOverviewProductId) return;
        const data = productData[currentOverviewProductId];
        if (!data) return;
        const existing = cart.find(item => item.name === data.name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name: data.name, price: data.price, img: data.images[0], qty: 1 });
        }
        renderCart();
        goToPage("cart");

        if (window.bootstrap && window.bootstrap.Modal) {
          const modal = bootstrap.Modal.getInstance(overviewModal);
          if (modal) modal.hide();
        }
      };
    }
  }

  function setActivePreview(idx) {
    if (!overviewCarouselPreviews) return;
    overviewCarouselPreviews.querySelectorAll("img").forEach((img, i) => {
      img.classList.toggle("active", i === idx);
    });
  }

  function fetchGenres() {
    return $.ajax({
      url: `${BASE_URL}/api/get_genres.php`,
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        if (response.success) {
          genresList = response.genres || [];
          renderProductCategories();
        } else {
          console.error("Failed to fetch genres:", response.error);
          showAlert("Failed to load genres. See console for details.", "danger");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("AJAX error (genres):", textStatus, errorThrown);
        console.error("Response:", jqXHR.responseText);
        showAlert("An error occurred while loading genres.", "danger");
      }
    });
  }

  function fetchProducts() {
    $.ajax({
      url: `${BASE_URL}/api/get_products.php`,
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        if (response.success) {
          productData = response.products;
          renderProductsSection();
          renderFeaturedGames();
        } else {
          console.error("Failed to fetch products:", response.message);
          showAlert("Failed to load products. See console for details.", "danger");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("AJAX error:", textStatus, errorThrown);
        console.error("Status code:", jqXHR.status);
        console.error("Response text:", jqXHR.responseText);
        showAlert("An error occurred while loading products. This shouldn't happen.", "danger");
      }
    });
  }
});