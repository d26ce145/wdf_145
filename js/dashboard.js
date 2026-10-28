window.onload = function() {
    var announcements = document.querySelectorAll("main section:nth-child(2) article");
    
    for (var i = 0; i < announcements.length; i++) {
        announcements[i].style.cursor = "pointer";
        announcements[i].onclick = function(e) {
            var title = e.currentTarget.querySelector("h3").innerText;
            alert("Opening details for: " + title);
        };
    }
};
