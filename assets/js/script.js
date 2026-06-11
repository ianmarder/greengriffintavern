/* The Green Griffin Tavern — script.js */

// On GitHub Pages the repo lives at /greengriffintavern/; locally it's at root.
const BASE_PATH = window.location.pathname.startsWith('/greengriffintavern')
  ? '/greengriffintavern'
  : '';

// ---------- Nav & footer partials ----------
// Single source of truth. Update here when the nav or footer changes.

const NAV_HTML = `
<header class="nav">
  <div class="nav__inner">
    <a href="${BASE_PATH}/" class="nav__brand" aria-label="The Green Griffin Tavern — Home">
      <img src="${BASE_PATH}/assets/svg/mark-green.svg" alt="" class="nav__mark">
    </a>
    <nav class="nav__links" aria-label="Primary">
      <a href="${BASE_PATH}/#content">Content</a>
      <a href="${BASE_PATH}/#connect">Connect</a>
      <a href="${BASE_PATH}/#about">About</a>
      <a href="${BASE_PATH}/book/" class="btn btn--primary nav__cta">Find session</a>
    </nav>
  </div>
</header>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer__inner">
    <a href="${BASE_PATH}/" class="footer__brand" aria-label="Home">
      <img src="${BASE_PATH}/assets/svg/mark-cream.svg" alt="The Green Griffin Tavern" class="footer__mark">
    </a>
    <nav class="footer__nav" aria-label="Footer">
      <a href="${BASE_PATH}/book/" class="btn btn--primary footer__cta">Find a session</a>
    </nav>
    <div class="footer__legal">
      <p>Copyright 2026 Green Griffin Tavern</p>
      <p>Blair Cameron, owner</p>
      <p>Site built by <a href="https://ianmarder.github.io" class="link">Ian Marder</a></p>
    </div>
  </div>
</footer>`;

const PARTIALS = { nav: NAV_HTML, footer: FOOTER_HTML };

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Inject partials ----------
  document.querySelectorAll('[data-include]').forEach(el => {
    const html = PARTIALS[el.dataset.include];
    if (html) el.outerHTML = html;
  });

  // ---------- Nav scroll state ----------
  const nav = document.querySelector('.nav');
  if (nav) {
    const setScrolled = () => {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  // ---------- Background video parallax ----------
  const bgVideo = document.querySelector('.bg-video__media');

  if (bgVideo && !prefersReducedMotion) {
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const t = Math.min(scrollY / maxScroll, 1);

      const eased = t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const scale = 1.1 + (eased * 0.3);
      const shift = -(eased * 120);
      bgVideo.style.transform = `scale(${scale}) translateY(${shift}px)`;
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  }

  // ---------- Randomize dividers ----------
  const dividerSVGs = [
    `${BASE_PATH}/assets/svg/divider1.svg`,
    `${BASE_PATH}/assets/svg/divider2.svg`,
    `${BASE_PATH}/assets/svg/divider3.svg`,
  ];

  document.querySelectorAll('.rule, .hero__rule').forEach(el => {
    const src = dividerSVGs[Math.floor(Math.random() * dividerSVGs.length)];
    el.style.maskImage = `url('${src}')`;
    el.style.webkitMaskImage = `url('${src}')`;
  });

  // ---------- Smooth anchor offset for sticky nav ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
})();
