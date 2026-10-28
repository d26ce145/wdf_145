/**
 * Practical 5: Registration Form with Frontend Validation & Password Strength
 * Subject: Web Development Frameworks (ITUE203) - Semester 3
 */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("studentRegisterForm");
    if (!form) return;

    // Elements
    const nameInput = document.getElementById("reg_name");
    const emailInput = document.getElementById("reg_email");
    const mobileInput = document.getElementById("reg_mobile");
    const passwordInput = document.getElementById("reg_password");
    const confirmPasswordInput = document.getElementById("reg_confirm_password");
    const courseSelect = document.getElementById("reg_course");
    const yearSelect = document.getElementById("reg_year");
    const termsCheckbox = document.getElementById("reg_terms");

    // Strength Meter Elements
    const strengthBar = document.getElementById("passwordStrengthBar");
    const strengthText = document.getElementById("passwordStrengthText");

    // Regular Expressions
    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;

    // Helper: Show error
    function showError(inputElement, errorId, message) {
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.add("visible");
        }
        if (inputElement && inputElement.type !== "checkbox" && inputElement.type !== "radio") {
            inputElement.classList.add("input-invalid");
            inputElement.classList.remove("input-valid");
        }
    }

    // Helper: Clear error
    function clearError(inputElement, errorId) {
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) {
            errorSpan.textContent = "";
            errorSpan.classList.remove("visible");
        }
        if (inputElement && inputElement.type !== "checkbox" && inputElement.type !== "radio") {
            inputElement.classList.remove("input-invalid");
            inputElement.classList.add("input-valid");
        }
    }

    // Field Validators
    function validateName() {
        const val = nameInput.value.trim();
        if (val === "") {
            showError(nameInput, "nameError", "Full name is required.");
            return false;
        } else if (!nameRegex.test(val)) {
            showError(nameInput, "nameError", "Name must contain only alphabets (minimum 3 characters).");
            return false;
        }
        clearError(nameInput, "nameError");
        return true;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        if (val === "") {
            showError(emailInput, "emailError", "Email address is required.");
            return false;
        } else if (!emailRegex.test(val)) {
            showError(emailInput, "emailError", "Please enter a valid email address (e.g. name@studenthub.com).");
            return false;
        }
        clearError(emailInput, "emailError");
        return true;
    }

    function validateMobile() {
        const val = mobileInput.value.trim();
        if (val === "") {
            showError(mobileInput, "mobileError", "Mobile number is required.");
            return false;
        } else if (!mobileRegex.test(val)) {
            showError(mobileInput, "mobileError", "Mobile number must be exactly 10 digits.");
            return false;
        }
        clearError(mobileInput, "mobileError");
        return true;
    }

    function validatePassword() {
        const val = passwordInput.value;
        if (val === "") {
            showError(passwordInput, "passwordError", "Password is required.");
            updatePasswordStrength("");
            return false;
        } else if (val.length < 6) {
            showError(passwordInput, "passwordError", "Password must be at least 6 characters long.");
            updatePasswordStrength(val);
            return false;
        }
        clearError(passwordInput, "passwordError");
        updatePasswordStrength(val);
        return true;
    }

    function validateConfirmPassword() {
        const pwd = passwordInput.value;
        const confirmPwd = confirmPasswordInput.value;
        if (confirmPwd === "") {
            showError(confirmPasswordInput, "confirmPasswordError", "Please confirm your password.");
            return false;
        } else if (pwd !== confirmPwd) {
            showError(confirmPasswordInput, "confirmPasswordError", "Passwords do not match.");
            return false;
        }
        clearError(confirmPasswordInput, "confirmPasswordError");
        return true;
    }

    function validateCourse() {
        if (!courseSelect || courseSelect.value === "") {
            showError(courseSelect, "courseError", "Please select your course.");
            return false;
        }
        clearError(courseSelect, "courseError");
        return true;
    }

    function validateYear() {
        if (!yearSelect || yearSelect.value === "") {
            showError(yearSelect, "yearError", "Please select your study year.");
            return false;
        }
        clearError(yearSelect, "yearError");
        return true;
    }

    function validateGender() {
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        const genderError = document.getElementById("genderError");
        if (!genderSelected) {
            if (genderError) {
                genderError.textContent = "Please select your gender.";
                genderError.classList.add("visible");
            }
            return false;
        }
        if (genderError) {
            genderError.textContent = "";
            genderError.classList.remove("visible");
        }
        return true;
    }

    function validateTerms() {
        const termsError = document.getElementById("termsError");
        if (!termsCheckbox || !termsCheckbox.checked) {
            if (termsError) {
                termsError.textContent = "You must accept the terms and conditions to proceed.";
                termsError.classList.add("visible");
            }
            return false;
        }
        if (termsError) {
            termsError.textContent = "";
            termsError.classList.remove("visible");
        }
        return true;
    }

    // Password Strength Meter
    function updatePasswordStrength(password) {
        if (!strengthBar || !strengthText) return;

        strengthBar.className = "password-meter-fill";

        if (password.length === 0) {
            strengthBar.style.width = "0%";
            strengthText.textContent = "Strength: Enter a password";
            return;
        }

        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) {
            strengthBar.classList.add("weak");
            strengthText.textContent = "Strength: Weak (Add letters, digits & special symbols)";
        } else if (score <= 4) {
            strengthBar.classList.add("medium");
            strengthText.textContent = "Strength: Medium (Good password)";
        } else {
            strengthBar.classList.add("strong");
            strengthText.textContent = "Strength: Strong (Excellent password!)";
        }
    }

    // Real-Time Event Listeners
    if (nameInput) nameInput.addEventListener("input", validateName);
    if (emailInput) emailInput.addEventListener("input", validateEmail);
    if (mobileInput) mobileInput.addEventListener("input", validateMobile);
    if (passwordInput) {
        passwordInput.addEventListener("input", function () {
            validatePassword();
            if (confirmPasswordInput.value !== "") validateConfirmPassword();
        });
    }
    if (confirmPasswordInput) confirmPasswordInput.addEventListener("input", validateConfirmPassword);
    if (courseSelect) courseSelect.addEventListener("change", validateCourse);
    if (yearSelect) yearSelect.addEventListener("change", validateYear);
    if (termsCheckbox) termsCheckbox.addEventListener("change", validateTerms);

    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(function (radio) {
        radio.addEventListener("change", validateGender);
    });

    // On Submit Validation
    form.addEventListener("submit", function (e) {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMobileValid = validateMobile();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();
        const isCourseValid = validateCourse();
        const isYearValid = validateYear();
        const isGenderValid = validateGender();
        const isTermsValid = validateTerms();

        if (
            !isNameValid ||
            !isEmailValid ||
            !isMobileValid ||
            !isPasswordValid ||
            !isConfirmValid ||
            !isCourseValid ||
            !isYearValid ||
            !isGenderValid ||
            !isTermsValid
        ) {
            e.preventDefault();
            alert("Please fix the highlighted errors before submitting the form.");
        }
    });
});
