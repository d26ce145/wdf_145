var feedbackForm = document.querySelector("form");

if (feedbackForm) {
    feedbackForm.onsubmit = function(e) {
        e.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        
        if (name === "" || email === "") {
            alert("Please fill out the form.");
            return;
        }

        alert("Thank you, " + name + "! Your feedback is received.");
        feedbackForm.reset();
    };
}
