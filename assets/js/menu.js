var dropdowns = document.querySelectorAll(".main-menu span.dropdown-icon")
dropdowns.forEach(function(dropdown) {
    dropdown.addEventListener("click", function(event) {
        this.parentElement.classList.toggle("open")
        event.preventDefault();
    });
});

var menutoggle = document.querySelector("#sitenav .menu-toggle");
menutoggle.addEventListener("click", function(event) {
    this.parentElement.classList.toggle("open");
});