// Makes the dropdown menus in the nav bar appear and disappear when you hover over them
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 991.98) {
                menu.classList.add('show');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 991.98) {
                menu.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
