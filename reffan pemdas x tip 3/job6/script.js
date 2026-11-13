/* ---------- Theme toggle ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const lightQuery = window.matchMedia('(prefers-color-scheme: light)');

function currentTheme() {
    return root.getAttribute('data-theme') || (lightQuery.matches ? 'light' : 'dark');
}

function updateThemeBtn() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    themeBtn.setAttribute('aria-label', 'Switch to ' + next + ' mode');
}

try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
} catch (e) { /* storage unavailable */ }
updateThemeBtn();

themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateThemeBtn();
});

/* ---------- Skill level dots ---------- */
document.querySelectorAll('.skill').forEach(skill => {
    const level = parseInt(skill.dataset.level, 10) || 0;
    const dots = skill.querySelector('.dots');
    for (let i = 1; i <= 5; i++) {
        const dot = document.createElement('i');
        if (i <= level) dot.classList.add('on');
        dots.appendChild(dot);
    }
});

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('in'));
}

/* ---------- Project filter ---------- */
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.proj');
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        projects.forEach(p => {
            p.classList.toggle('hide', !(filter === 'all' || p.dataset.cat === filter));
        });
    });
});

/* ---------- Contact form ---------- */
/* No backend yet: the form opens the visitor's email app with the message filled in. */
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const MY_EMAIL = 'reffanramadan2010@gmail.com';

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message || !form.email.checkValidity()) {
        formMsg.textContent = 'Please fill in every field with a valid email.';
        formMsg.className = 'mono err';
        return;
    }

    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:' + MY_EMAIL + '?subject=' + subject + '&body=' + body;

    formMsg.textContent = 'Opening your email app…';
    formMsg.className = 'mono ok';
    form.reset();
});