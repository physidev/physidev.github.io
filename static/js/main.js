function toggleMenu() {
    navbar = document.getElementById('navbar');
    if (navbar.className === '') {
        navbar.className += 'opened';
    } else {
        navbar.className = '';
    }
}
function closeMenu() {
    navbar = document.getElementById('navbar');
    navbar.className = '';
}