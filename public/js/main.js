// ── Init Lucide icons ──
lucide.createIcons();

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ──
const STAGGER_PARENTS = ['features-grid', 'stats-grid', 'testimonials-grid', 'steps', 'segments-grid'];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const parentClass = el.parentElement ? el.parentElement.className : '';
    const isStaggered = STAGGER_PARENTS.some(c => parentClass.includes(c));

    let delay = 0;
    if (isStaggered) {
      const index = Array.from(el.parentElement.children).indexOf(el);
      delay = index * 90;
    }

    el.style.transitionDelay = `${delay}ms`;
    el.classList.add('revealed');

    // Reset delay after animation so hover transitions are instant
    setTimeout(() => { el.style.transitionDelay = ''; }, delay + 800);

    revealObserver.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-right').forEach(el => revealObserver.observe(el));

// ── Counter animation ──
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));