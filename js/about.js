window.onload = function() {
    var articles = document.querySelectorAll("main section article");
    
    for (var i = 0; i < articles.length; i++) {
        articles[i].style.cursor = "pointer";
        articles[i].onclick = function(e) {
            var title = e.currentTarget.querySelector("h3").innerHTML;
            alert("Learn more about how we " + title + "!");
        };
    }
};
