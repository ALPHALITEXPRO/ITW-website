// Show or hide the mobile menu
function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
    } else {
        navLinks.classList.add("open");
    }
}

// Close menu when a nav link is clicked
var allNavLinks = document.querySelectorAll("#navLinks a");
for (var i = 0; i < allNavLinks.length; i++) {
    allNavLinks[i].addEventListener("click", function() {
        document.getElementById("navLinks").classList.remove("open");
    });
}

// Show toast message
function showToast(message, type) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show " + type;

    setTimeout(function() {
        toast.className = "";
    }, 3500);
}

// Show or hide error for a field group
function showError(groupId, show) {
    var group = document.getElementById(groupId);
    if (show) {
        group.classList.add("has-error");
    } else {
        group.classList.remove("has-error");
    }
}

// Check if email is valid
function isValidEmail(email) {
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        return false;
    }
    return true;
}

// Check if phone number is valid (Indian mobile - starts with 6-9, 10 digits)
function isValidPhone(phone) {
    var cleaned = phone.replace(/\D/g, ""); // remove non-digits
    if (cleaned.length !== 10) {
        return false;
    }
    var firstDigit = parseInt(cleaned[0]);
    if (firstDigit < 6) {
        return false;
    }
    return true;
}

// Toggle password visibility
function togglePw(inputId, toggleId) {
    var input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// Scroll events - sticky nav and back to top button
window.addEventListener("scroll", function() {
    var scrollY = window.scrollY;

    // Show back-to-top button after scrolling down
    var backBtn = document.getElementById("backTop");
    if (scrollY > 400) {
        backBtn.classList.add("show");
    } else {
        backBtn.classList.remove("show");
    }
});

// Login form validation
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var email = document.getElementById("lgEmail").value.trim();
    var password = document.getElementById("lgPw").value.trim();
    var isValid = true;

    // Check email
    if (!isValidEmail(email)) {
        showError("lg-email-grp", true);
        isValid = false;
    } else {
        showError("lg-email-grp", false);
    }

    // Check password
    if (password.length < 6) {
        showError("lg-pw-grp", true);
        isValid = false;
    } else {
        showError("lg-pw-grp", false);
    }

    if (isValid) {
        showToast("Login successful! Welcome back!", "success");
        this.reset();
    } else {
        showToast("Please fix the errors and try again.", "error");
    }
});

// Register form validation
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var firstName = document.getElementById("rgFN").value.trim();
    var lastName = document.getElementById("rgLN").value.trim();
    var email = document.getElementById("rgEmail").value.trim();
    var phone = document.getElementById("rgPhone").value.trim();
    var password = document.getElementById("rgPw").value;
    var confirmPassword = document.getElementById("rgCPw").value;
    var isValid = true;

    // Check first name
    if (firstName === "") {
        showError("rg-fn-grp", true);
        isValid = false;
    } else {
        showError("rg-fn-grp", false);
    }

    // Check last name
    if (lastName === "") {
        showError("rg-ln-grp", true);
        isValid = false;
    } else {
        showError("rg-ln-grp", false);
    }

    // Check email
    if (!isValidEmail(email)) {
        showError("rg-email-grp", true);
        isValid = false;
    } else {
        showError("rg-email-grp", false);
    }

    // Check phone
    if (!isValidPhone(phone)) {
        showError("rg-phone-grp", true);
        isValid = false;
    } else {
        showError("rg-phone-grp", false);
    }

    // Check password (min 8 chars and must have a number)
    var hasNumber = false;
    for (var i = 0; i < password.length; i++) {
        if (!isNaN(password[i]) && password[i] !== " ") {
            hasNumber = true;
        }
    }

    if (password.length < 8 || !hasNumber) {
        showError("rg-pw-grp", true);
        isValid = false;
    } else {
        showError("rg-pw-grp", false);
    }

    // Check confirm password
    if (password !== confirmPassword) {
        showError("rg-cpw-grp", true);
        isValid = false;
    } else {
        showError("rg-cpw-grp", false);
    }

    if (isValid) {
        showToast("Account created successfully!", "success");
        this.reset();
    } else {
        showToast("Please complete all required fields.", "error");
    }
});

// Feedback form validation
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var name = document.getElementById("fbName").value.trim();
    var email = document.getElementById("fbEmail").value.trim();
    var message = document.getElementById("fbMsg").value.trim();
    var isValid = true;

    // Check name
    if (name === "") {
        showError("fb-name-grp", true);
        isValid = false;
    } else {
        showError("fb-name-grp", false);
    }

    // Check email
    if (!isValidEmail(email)) {
        showError("fb-email-grp", true);
        isValid = false;
    } else {
        showError("fb-email-grp", false);
    }

    // Check message length
    if (message.length < 20) {
        showError("fb-msg-grp", true);
        isValid = false;
    } else {
        showError("fb-msg-grp", false);
    }

    if (isValid) {
        showToast("Thank you, " + name + "! Your feedback was submitted.", "success");
        this.reset();
    } else {
        showToast("Please fill all required fields.", "error");
    }
});
