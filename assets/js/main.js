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

// Theme switch (footer). By default the site follows the system light/dark
// setting; the switch stores an override in localStorage. Switching back to
// whatever the system wants clears the override, so it follows the system again.
var systemLight = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
function systemTheme() {
    return systemLight && systemLight.matches ? 'light' : 'dark';
}
function savedTheme() {
    try { var t = localStorage.getItem('theme'); } catch (e) { return null; }
    return t === 'light' || t === 'dark' ? t : null;
}
function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.dataset.theme = 'light';
    } else {
        delete document.documentElement.dataset.theme;
    }
    updateThemeToggle();
}
function currentTheme() {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}
function updateThemeToggle() {
    var button = document.getElementById('theme-toggle');
    if (!button) return;
    var light = currentTheme() === 'light';
    button.textContent = light ? 'Dark mode' : 'Light mode';
    button.setAttribute('aria-pressed', light ? 'true' : 'false');
    button.hidden = false;
}
function toggleTheme() {
    var next = currentTheme() === 'light' ? 'dark' : 'light';
    try {
        if (next === systemTheme()) {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', next);
        }
    } catch (e) {}
    applyTheme(next);
}
// Follow live system changes unless the visitor has picked a theme.
if (systemLight && systemLight.addEventListener) {
    systemLight.addEventListener('change', function () {
        if (!savedTheme()) applyTheme(systemTheme());
    });
}
document.addEventListener('DOMContentLoaded', updateThemeToggle);
