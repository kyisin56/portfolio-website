// =========================================================
// THEME TOGGLE (dark default, remembers choice for this session)
// =========================================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
}

// Respect saved preference, otherwise default to dark (per design brief)
const savedTheme = sessionStorage.getItem('kyisin-theme');
applyTheme(savedTheme || 'dark');

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  sessionStorage.setItem('kyisin-theme', next);
});

// =========================================================
// STICKY NAVBAR SHADOW/BORDER ON SCROLL
// =========================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > 10);
});

// =========================================================
// MOBILE HAMBURGER MENU
// =========================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu after tapping a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// =========================================================
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// =========================================================
// CONTACT FORM (no backend attached — opens a pre-filled email)
// Swap this out for a real form endpoint (e.g. Formspree, your
// own API) when you're ready to accept submissions server-side.
// =========================================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

  window.location.href = `mailto:kyisin.t116@gmail.com?subject=${subject}&body=${body}`;
});

// =========================================================
// BACK TO TOP
// =========================================================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
