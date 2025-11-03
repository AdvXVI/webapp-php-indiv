//TODO: fix
//wip - dont touch

$(function () {
    console.log("script_validator.js loaded!");

    $.validator.addMethod("textInput", function (value, element, maxLength) {
        const trimmed = value.trim();
        if (!trimmed) return false;
        if (!/[a-zA-Z0-9]/.test(trimmed)) return false;
        if (trimmed.length > maxLength) return false;
        return true;
    }, "Invalid input.");

    $.validator.addMethod("customEmail", function (value, element) {
        value = value.trim();
        if (!value) return false;

        const parts = value.split('@');
        if (parts.length !== 2) return false;

        const [local, domain] = parts;
        if (!local || !domain) return false;

        if (!/^[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])?$/.test(local)) return false;

        if (!/^[A-Za-z0-9-]+\.[A-Za-z]{2,3}$/.test(domain)) return false;

        //this domain allows subdomains, top one does not
        //if (!/^[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/.test(domain)) return false;

        const labels = domain.split('.');
        if (labels.length !== 2) return false; //comment out if allowing subdomains
        for (const label of labels) {
            if (label.length === 0) return false;
            if (!/[A-Za-z0-9]/.test(label)) return false;
            if (/^-|-$/.test(label)) return false;
        }

        return true;
    }, "Invalid email address");


    $.validator.addMethod("notEmpty", function (value, element) {
        return value.trim().length > 0;
    }, "This field cannot be empty.");

    // Contact number
    $.validator.addMethod("contactNumber", function (value, element) {
        value = value.trim();
        return this.optional(element) || /^\d{6,19}$/.test(value);
    }, "Please enter a valid contact number (6-19 digits).");

    $.validator.addMethod("strongPassword", function (value, element) {
        // At least 8 characters
        if (value.length < 8) return false;

        // At least 1 lowercase letter
        if (!/[a-z]/.test(value)) return false;

        // At least 1 uppercase letter
        if (!/[A-Z]/.test(value)) return false;

        // At least 1 number
        if (!/[0-9]/.test(value)) return false;

        // At least 1 special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return false;

        return true;
    }, "Password must be at least 8 characters, with uppercase, lowercase, number, and special character.");

    $.validator.addMethod("passwordMatch", function (value, element, param) {
        const passwordVal = $(param).val().trim();
        return value.trim() === passwordVal && value.trim().length > 0;
    }, "Passwords do not match.");

    $.validator.addMethod("cardNumber", function (value, element) {
        const digits = value.replace(/\s+/g, "");
        return this.optional(element) || /^\d{16,19}$/.test(digits);
    }, "Invalid card number (16-19 digits).");

    $.validator.addMethod("cardExpiry", function (value, element) {
        if (!/^\d{2}\/\d{2}$/.test(value)) return false;
        const [mm, yy] = value.split("/").map(Number);
        if (mm < 1 || mm > 12) return false;
        const now = new Date();
        const year = 2000 + yy;
        const expiry = new Date(year, mm);
        return expiry > now;
    }, "Invalid expiry date.");

    $.validator.addMethod("cardCVC", function (value, element) {
        return this.optional(element) || /^\d{3,4}$/.test(value);
    }, "Invalid CVC.");

    $.validator.addMethod("paymentSelected", function (value, element) {
        return $('input[name="payment-method"]:checked').length > 0;
    }, "Please select a payment method.");



    // -- restrictions -- 

    function restrictToDigits($el) {
        $el.on('keypress', e => {
            if (!/[0-9]/.test(String.fromCharCode(e.which))) e.preventDefault();
        });
    }

    function restrictToText($el) {
        $el.on('keypress', e => {
            if (!/^[\p{L} ]$/u.test(String.fromCharCode(e.which))) e.preventDefault();
        });
    }

    function restrictToEmail($el) {
        $el.on('keypress', e => {
            const char = String.fromCharCode(e.which);
            const val = $el.val();
            if (!/[a-zA-Z0-9._@-]/.test(char) || (char === '@' && val.includes('@'))) {
                e.preventDefault();
            }
        });
    }

});