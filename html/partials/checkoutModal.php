  <!-- Checkout Modal -->
  <div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true"
    data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="checkoutModalLabel">Checkout</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="checkout-summary"></div>
          <form id="checkout-form" class="mt-4">
            <div class="mb-3">
              <label for="checkout-email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="checkout-email" name="checkout-email" required
                autocomplete="email" placeholder="you@email.com">
              <div class="invalid-feedback" id="checkout-email-feedback"></div>
            </div>
            <div class="mb-3">
              <label class="form-label">Payment Method</label>
              <div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="payment-method" id="pay-card" value="card"
                    required>
                  <label class="form-check-label" for="pay-card">Card</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="payment-method" id="pay-paypal" value="paypal">
                  <label class="form-check-label" for="pay-paypal">PayPal</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="payment-method" id="pay-gcash" value="gcash">
                  <label class="form-check-label" for="pay-gcash">GCash</label>
                </div>
              </div>
              <div class="invalid-feedback" id="payment-method-feedback" style="display:block"></div>
            </div>
            <div id="card-details" style="display:none;">
              <div class="mb-3">
                <label for="card-number" class="form-label">Card Number</label>
                <input type="text" class="form-control" id="card-number" name="card-number" maxlength="19"
                  placeholder="1234 5678 9012 3456" inputmode="numeric" pattern="[\d ]{16,19}">
                <div class="invalid-feedback" id="card-number-feedback"></div>
              </div>
              <div class="mb-3 row">
                <div class="col">
                  <label for="card-expiry" class="form-label">Expiry (MM/YY)</label>
                  <input type="text" class="form-control" id="card-expiry" name="card-expiry" maxlength="5"
                    placeholder="MM/YY" pattern="\d{2}/\d{2}">
                  <div class="invalid-feedback" id="card-expiry-feedback"></div>
                </div>
                <div class="col">
                  <label for="card-cvc" class="form-label">CVC</label>
                  <input type="text" class="form-control" id="card-cvc" name="card-cvc" maxlength="4" placeholder="123"
                    pattern="\d{3,4}">
                  <div class="invalid-feedback" id="card-cvc-feedback"></div>
                </div>
              </div>
              <div class="mb-3">
                <label for="card-name" class="form-label">Name on Card</label>
                <input type="text" class="form-control" id="card-name" name="card-name" maxlength="40"
                  placeholder="Cardholder Name">
                <div class="invalid-feedback" id="card-name-feedback"></div>
              </div>
            </div>
          </form>
          <div id="checkout-thankyou" class="text-center" style="display:none;">
            <div class="alert alert-success">Thank you for your purchase! Your game's download link and transaction
              receipt will be sent to your email address.</div>
            <button id="thankyou-confirm-btn" class="btn btn-primary mt-3" type="button"
              data-bs-dismiss="modal">Confirm</button>
          </div>
        </div>
        <div class="modal-footer" id="checkout-modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button id="confirm-purchase-btn" type="submit" form="checkout-form" class="btn btn-success" disabled>Confirm
            Purchase</button>
        </div>
      </div>
    </div>
  </div>