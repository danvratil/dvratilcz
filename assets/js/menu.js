var dropdowns = document.querySelectorAll(".main-menu span.dropdown-icon")
dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("click", function (event) {
        this.parentElement.classList.toggle("open")
        event.preventDefault();
    });
});

var menuToggle = document.querySelector("#sitenav .menu-toggle");
menuToggle.addEventListener("click", function (event) {
    this.parentElement.classList.toggle("open");
});

var sidebarToggle = document.querySelector("#sidebar .sidebar-toggle");
sidebarToggle.addEventListener("click", function (event) {
    document.getElementsByTagName("body")[0].classList.toggle("sidebar-closed");
});

function responsiveDOM() {
    var body = document.querySelector("body");
    if (window.innerWidth > 959 && !body.classList.contains("responsive-large")) {
        var sidebar = document.querySelector("#sidebar .sidebar-content");
        var headPlaceholder = document.querySelector("#sidebar .head-placeholder");
        var head  = document.querySelector("#head");
        sidebar.insertBefore(head, headPlaceholder);
    } else {
        var page = document.querySelector("#page");
        var headPlaceholder = document.querySelector("#page > .head-placeholder");
        var head = document.querySelector("#head");
        page.insertBefore(head, headPlaceholder);
    }
}
window.addEventListener("resize", responsiveDOM);
