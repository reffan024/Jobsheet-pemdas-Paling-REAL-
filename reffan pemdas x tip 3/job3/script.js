const btnToggle = document.getElementById('themeToggleBtn');
const root = document.documentElement;
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
    const forced = root.getAttribute('data-theme');
    if (forced) return forced;
    return darkQuery.matches ? 'dark' : 'light';
}

function updateButton() {
    btnToggle.textContent = currentTheme() === 'dark'
        ? 'Switch to Light Mode'
        : 'Switch to Dark Mode';
}

// Restore the saved choice (if any)
try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
        root.setAttribute('data-theme', saved);
    }
} catch (e) { /* storage unavailable, ignore */ }

updateButton();

btnToggle.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateButton();
});

// Keep the button correct if the system theme changes while no choice is forced
darkQuery.addEventListener('change', updateButton);