window.onload = function() {
    var links = document.querySelectorAll("address a");
    
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function(e) {
            var linkType = e.currentTarget.getAttribute("href");
            
            if (linkType.indexOf("mailto:") === 0) {
                alert("This will open your default email application to contact support.");
            } else if (linkType.indexOf("tel:") === 0) {
                alert("This will start a phone call to our support team.");
            }
        };
    }
};
