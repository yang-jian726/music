var content1 = document.getElementById("catalog");
var spans = content1.getElementsByTagName("span");
var contentPannel = document.getElementById('contentPannel');
var lis = contentPannel.getElementsByTagName("ul");
for (var i = 0; i < spans.length; i++) {
    spans[i].aaa = i;
    spans[i].onclick = function () {
        for (var i = 0; i < spans.length; i++) {
            spans[i].className = "";
            lis[i].className = "";
        }
        this.className = "active";
        lis[this.aaa].className = "active";
    }
}