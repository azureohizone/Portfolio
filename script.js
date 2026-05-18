<<<<<<< HEAD
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
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(240,236,228,0.14)';
  } else {
    nav.style.borderBottomColor = 'rgba(240,236,228,0.08)';
  }
});

/* ─── ACTIVE NAV LINK ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#c8a96e';
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
const submitBtn = document.getElementById('formSubmit');
const formNote = document.getElementById('formNote');

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const msg = document.getElementById('fmsg').value.trim();

    if (!name || !email || !msg) {
      formNote.style.color = '#e07070';
      formNote.textContent = 'Please fill in all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formNote.style.color = '#e07070';
      formNote.textContent = 'Please enter a valid email address.';
      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Message Sent ✓';
      formNote.style.color = '#6dbf85';
      formNote.textContent = `Thanks, ${name}! I'll get back to you soon.`;
      document.getElementById('fname').value = '';
      document.getElementById('femail').value = '';
      document.getElementById('fmsg').value = '';
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        formNote.textContent = '';
      }, 4000);
    }, 1200);
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
=======
// Reveal elements on scroll using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));
>>>>>>> 260a629bcb6fa3ac80a3a07cec0f4d1cd99b550b
