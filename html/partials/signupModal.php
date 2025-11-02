<!-- SIGN UP MODAL -->
<div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="signupModalLabel">Sign Up</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="text-center mb-3">
                    <small>
                        Already have an account?
                        <a href="#" id="openLogin" class="text-decoration-none text-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Login here</a>
                    </small>
                </div>
                <form id="signup-form" novalidate>
                <div class="mb-3">
                    <label for="signup-name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="signup-name" name="signup-name" maxlength="30" placeholder="Juan Dela Cruz" required>
                    <div class="invalid-feedback" id="signup-name-feedback"></div>
                </div>
                <div class="mb-3">
                    <label for="signup-email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="signup-email" name="signup-email" placeholder="juan@gmail.com" required>
                    <div class="invalid-feedback" id="signup-email-feedback"></div>
                </div>
                <div class="mb-3">
                    <label for="signup-address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="signup-address" name="signup-address" maxlength="50" placeholder="Brgy. Estrella, San Pedro City" required>
                    <div class="invalid-feedback" id="signup-address-feedback"></div>
                </div>
                <div class="mb-3">
                    <label for="signup-contact" class="form-label">Contact Number</label>
                    <input type="tel" class="form-control" id="signup-contact" name="signup-contact" pattern="\\d+" maxlength="19" placeholder="09123456789" required>
                    <div class="invalid-feedback" id="signup-contact-feedback"></div>
                </div>
                <div class="mb-3">
                    <label for="signup-password" class="form-label">Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="signup-password" name="signup-password" placeholder="••••••••" required>
                        <button class="btn btn-outline-secondary toggle-password" type="button" data-target="#signup-password">
                            <i class="bi bi-eye"></i>
                        </button>
                        <div class="invalid-feedback" id="signup-password-feedback"></div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="signup-confirm" class="form-label">Retype Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="signup-confirm" name="signup-confirm" placeholder="••••••••" required>
                        <button class="btn btn-outline-secondary toggle-password" type="button" data-target="#signup-confirm">
                            <i class="bi bi-eye"></i>
                        </button>
                        <div class="invalid-feedback" id="signup-confirm-feedback"></div>
                    </div>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-success">Create Account</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>