var dropdowns = document.querySelectorAll(".main-menu span.dropdown-icon")
dropdowns.forEach(function(dropdown) {
    dropdown.addEventListener("click", function(event) {
        this.parentElement.classList.toggle("open")
        event.preventDefault();
    });
});

var menuToggle = document.querySelector("#sitenav .menu-toggle");
menuToggle.addEventListener("click", function(event) {
    this.parentElement.classList.toggle("open");
});

var sidebarToggle = document.querySelector("#sidebar .sidebar-toggle");
sidebarToggle.addEventListener("click", function(event) {
    document.getElementsByTagName("body")[0].classList.toggle("sidebar-closed");
});