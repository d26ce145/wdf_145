/**
 * Practical 4: JavaScript DOM Manipulation, Event Handling, and UI Interactivity
 * Subject: Web Development Frameworks (ITUE203) - Semester 3
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Light / Dark Theme Switcher with localStorage
    const themeBtn = document.getElementById("themeToggleBtn");
    const currentTheme = localStorage.getItem("studenthub_theme") || "light";

    if (currentTheme === "dark") {
        document.body.classList.add("dark");
        if (themeBtn) themeBtn.textContent = "☀️ Light Mode";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark");
            const isDark = document.body.classList.contains("dark");
            if (isDark) {
                themeBtn.textContent = "☀️ Light Mode";
                localStorage.setItem("studenthub_theme", "dark");
            } else {
                themeBtn.textContent = "🌙 Dark Mode";
                localStorage.setItem("studenthub_theme", "light");
            }
        });
    }

    // 2. Responsive Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mainNav = document.getElementById("mainNav");

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener("click", function () {
            mainNav.classList.toggle("active");
        });
    }

    // 3. Notification Banner Dismissal
    const closeBannerBtn = document.getElementById("closeBannerBtn");
    const notificationBanner = document.getElementById("notificationBanner");

    if (closeBannerBtn && notificationBanner) {
        closeBannerBtn.addEventListener("click", function () {
            notificationBanner.classList.add("hidden");
            // Remember banner closed for this session
            sessionStorage.setItem("banner_dismissed", "true");
        });

        if (sessionStorage.getItem("banner_dismissed") === "true") {
            notificationBanner.classList.add("hidden");
        }
    }

    // 4. Image / Content Slider (on Home page)
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("sliderPrevBtn");
    const nextBtn = document.getElementById("sliderNextBtn");

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval = null;

        function showSlide(index) {
            slides.forEach((slide) => slide.classList.remove("active"));
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                showSlide(currentSlide - 1);
                resetAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                showSlide(currentSlide + 1);
                resetAutoSlide();
            });
        }

        function startAutoSlide() {
            slideInterval = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        function resetAutoSlide() {
            if (slideInterval) clearInterval(slideInterval);
            startAutoSlide();
        }

        startAutoSlide();
    }

    // 5. Modal Popup Handling
    const openModalBtns = document.querySelectorAll(".open-modal-trigger");
    const modalOverlay = document.getElementById("infoModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalOkBtn = document.getElementById("modalOkBtn");

    function openModal(title, message) {
        if (!modalOverlay) return;
        const modalTitle = document.getElementById("modalTitle");
        const modalBody = document.getElementById("modalBody");
        if (modalTitle && title) modalTitle.textContent = title;
        if (modalBody && message) modalBody.textContent = message;
        modalOverlay.classList.add("active");
    }

    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove("active");
    }

    if (openModalBtns.length > 0) {
        openModalBtns.forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                const title = btn.getAttribute("data-modal-title") || "Information";
                const msg = btn.getAttribute("data-modal-text") || "Welcome to StudentHub!";
                openModal(title, msg);
            });
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (modalOkBtn) modalOkBtn.addEventListener("click", closeModal);

    if (modalOverlay) {
        modalOverlay.addEventListener("click", function (e) {
            if (e.target === modalOverlay) closeModal();
        });
    }
});
