window.onload = function() {
    var events = document.querySelectorAll("main section article");
    
    for (var i = 0; i < events.length; i++) {
        events[i].style.cursor = "pointer";
        events[i].onclick = function(e) {
            var title = e.currentTarget.querySelector("h3").innerText;
            alert("You clicked on: " + title);
        };
    }
};
