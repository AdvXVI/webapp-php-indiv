jQuery(function () {

  //TODO: clean abd reformat, waiting sa ibang admin pages for the js funcs
  //NOTE: showAlert is imported, should have a separate script for main script utils that every script can use

  showPendingAlert();
  addProductForm();

  $.validator.addMethod("atLeastOneImage", function (value, element) {
    const files = $(element)[0].files;
    return files && files.length > 0;
  }, "Please upload at least one image.");

  // ADD PRODUCTS

  function addProductForm() {
    const $form = $('#addProductForm');

    $form.validate({
      onkeyup: function (element) { $(element).valid(); },
      onfocusout: function (element) { $(element).valid(); },

      rules: {
        slug: { required: true },
        name: { required: true },
        price: { required: true },
        genre: { required: true },
        description: { required: true },
        'images[]': { atLeastOneImage: true }
      },

      messages: {
        slug: { required: "Please enter a slug." },
        name: { required: "Please enter a name." },
        price: { required: "Please enter a price." },
        genre: { required: "Please enter at least one genre." },
        description: { required: "Please enter a description." },
        'images[]': { atLeastOneImage: "Please upload at least one image." }
      },

      errorClass: "is-invalid",
      validClass: "is-valid",
      errorPlacement: function (error, element) {
        const $feedback = $('#' + element.attr('id') + '-feedback');
        if ($feedback.length) $feedback.text(error.text());
        else error.insertAfter(element);
      },
      highlight: function (element) {
        $(element).addClass('is-invalid').removeClass('is-valid');
      },
      unhighlight: function (element) {
        $(element).removeClass('is-invalid').addClass('is-valid');
        const $feedback = $('#' + element.id + '-feedback');
        if ($feedback.length) $feedback.text('');
      },

      submitHandler: function (form) {
        console.log("pressed");
        const formData = new FormData(form);

        $.ajax({
          url: `${BASE_URL}/api/add_product_submit.php`,
          method: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          dataType: 'json',
          success: function (response) {
            if (response.success) {
              showAlert(response.message, "success");
              console.log("success");
              $form[0].reset();
              $form.find('.is-valid').removeClass('is-valid');
            } else {
              showAlert(response.message || "Failed to add product.", "danger");
              console.log("fail");
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX error:", textStatus, errorThrown);
            console.error("Status code:", jqXHR.status);
            console.error("Response text:", jqXHR.responseText);
            showAlert("An unexpected error occurred while adding the product.", "danger");
          }
        });
      }
    });
  }

  function showAlert(message, type = "danger", duration = 3000, persist = false) {
    const container = document.getElementById("global-alert-container");
    if (!container) return;

    if (persist) {
      sessionStorage.setItem(
        "pendingAlert",
        JSON.stringify({ message, type, duration })
      );
    }

    // Cap to max 3 alerts, remove oldest if needed
    const alerts = container.querySelectorAll(".alert");
    if (alerts.length >= 3) {
      const oldest = alerts[0];
      const bsOldest = bootstrap.Alert.getOrCreateInstance(oldest);
      oldest.classList.add("alert-exit-active");
      setTimeout(() => bsOldest.close(), 300);
    }

    // Create alert element
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible text-center shadow fade show alert-enter`;
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

    container.appendChild(alertDiv);

    // Animate in
    requestAnimationFrame(() => {
      alertDiv.classList.remove("alert-enter");
      alertDiv.classList.add("alert-enter-active");
    });

    // Auto-dismiss after duration (if > 0)
    if (duration > 0) {
      setTimeout(() => {
        alertDiv.classList.remove("alert-enter-active");
        alertDiv.classList.add("alert-exit-active");
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
        setTimeout(() => bsAlert.close(), 300);
      }, duration);
    }

    // Animate out when closed manually
    alertDiv.addEventListener("close.bs.alert", () => {
      alertDiv.classList.remove("alert-enter-active");
      alertDiv.classList.add("alert-exit-active");
    });
  }

  function showPendingAlert() {
    const pending = sessionStorage.getItem("pendingAlert");
    if (!pending) return;

    try {
      const { message, type, duration } = JSON.parse(pending);
      showAlert(message, type, duration);
    } catch (e) {
      console.error("Failed to parse pending alert:", e);
    }
    sessionStorage.removeItem("pendingAlert");
  }

});
