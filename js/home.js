window.onload = function() {
    // 1. HAMBURGER MENU
    var menuButton = document.getElementById("menuButton");
    var navbar = document.getElementById("navbar");

    if (menuButton && navbar) {
        menuButton.onclick = function() {
            if (navbar.style.display === "block") {
                navbar.style.display = "none";
            } else {
                navbar.style.display = "block";
            }
        };
    }

    // 2. DARK / LIGHT MODE
    var themeButton = document.getElementById("themeButton");
    var savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        if (themeButton) themeButton.innerHTML = "☀️ Light Mode";
    }

    if (themeButton) {
        themeButton.onclick = function() {
            document.body.classList.toggle("dark");
            var isDark = document.body.classList.contains("dark");
            
            if (isDark) {
                themeButton.innerHTML = "☀️ Light Mode";
                localStorage.setItem("theme", "dark");
            } else {
                themeButton.innerHTML = "🌙 Dark Mode";
                localStorage.setItem("theme", "light");
            }
        };
    }

    // 3. NOTIFICATION BANNER
    var notification = document.getElementById("notification");
    var closeNotification = document.getElementById("closeNotification");

    if (notification && closeNotification) {
        closeNotification.onclick = function() {
            notification.style.display = "none";
        };
    }

    // 4. REGISTRATION MODAL
    var registrationForm = document.getElementById("registrationForm");
    var modal = document.getElementById("modal");
    var closeModal = document.getElementById("closeModal");
    var modalOk = document.getElementById("modalOk");

    if (registrationForm && modal) {
        registrationForm.onsubmit = function(e) {
            e.preventDefault();
            modal.style.display = "block";
        };

        function hideModal() {
            modal.style.display = "none";
        }
        
        if (closeModal) closeModal.onclick = hideModal;
        if (modalOk) modalOk.onclick = hideModal;
        
        window.onclick = function(e) {
            if (e.target === modal) {
                hideModal();
            }
        };
    }
};
