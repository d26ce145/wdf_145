var loginForm = document.querySelector("form");

if (loginForm) {
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }

        alert("Welcome back, " + username + "! Login successful.");
        loginForm.reset();
    };
}
