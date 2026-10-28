window.onload = function() {
    var profileSection = document.querySelector("main section:nth-child(3)");
    
    if (profileSection) {
        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit Profile";
        editButton.style.marginTop = "20px";
        editButton.style.padding = "10px 15px";
        editButton.style.backgroundColor = "#0d6efd";
        editButton.style.color = "white";
        editButton.style.border = "none";
        editButton.style.borderRadius = "5px";
        editButton.style.cursor = "pointer";

        editButton.onclick = function() {
            alert("Edit Profile functionality is coming soon!");
        };

        profileSection.appendChild(editButton);
    }
};
