/* ─── THEME TOGGLE ─────────────────────────── */
const themeToggle = document.getElementById('themeToggle');

function updateThemeToggle(theme) {
  if (!themeToggle) return;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
}

if (themeToggle) {
  updateThemeToggle(document.documentElement.dataset.theme || 'light');
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try { localStorage.setItem('portfolio-theme', nextTheme); } catch (error) { /* Storage may be unavailable. */ }
    updateThemeToggle(nextTheme);
  });
}

/* ─── CUSTOM CURSOR ─────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && cursorDot) {
  let cx = 0, cy = 0;
  let tx = 0, ty = 0;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    cursorDot.style.left = tx + 'px';
    cursorDot.style.top = ty + 'px';
  });

  function animCursor() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
}

/* ─── HAMBURGER MENU ─────────────────────────── */
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('mobileOverlay');
const overlayClose = document.getElementById('overlayClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMenu);
if (overlayClose) overlayClose.addEventListener('click', closeMenu);
mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

/* ─── SCROLL REVEAL ─────────────────────────── */
const reveals = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger children inside same parent
let prevParent = null;
let siblingCount = 0;
reveals.forEach(el => {
  if (el.parentElement === prevParent) {
    siblingCount += 80;
  } else {
    siblingCount = 0;
    prevParent = el.parentElement;
  }
  el.dataset.delay = siblingCount;
  revealObserver.observe(el);
});

/* ─── NAV SCROLL EFFECT ─────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── ACTIVE NAV LINK ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ─── PROJECT CARD BARS ANIMATION ─────────────────────────── */
const bars = document.querySelectorAll('.bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      bars.forEach((b, i) => {
        setTimeout(() => {
          b.style.opacity = '1';
        }, i * 120);
      });
      barObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const dataViz = document.querySelector('.v4');
if (dataViz) barObserver.observe(dataViz);

/* ─── CONTACT FORM ─────────────────────────── */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('formSubmit');
const formNote = document.getElementById('formNote');

if (contactForm && submitBtn && formNote) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    formNote.textContent = '';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(contactForm)
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Message could not be sent.');
      }

      contactForm.reset();
      submitBtn.textContent = 'Message Sent ✓';
      formNote.style.color = 'var(--accent)';
      formNote.textContent = 'Thanks! Your message has been sent successfully.';
    } catch (error) {
      submitBtn.textContent = 'Send Message';
      formNote.style.color = 'var(--error)';
      formNote.textContent = error.message || 'Something went wrong. Please try again.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ─── SMOOTH LINK SCROLL OFFSET (for fixed nav) ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
