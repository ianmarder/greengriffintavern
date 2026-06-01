/* The Green Griffin Tavern — script.js
   Minimal interactivity: scroll-shadow on nav, smooth-scroll with sticky offset. */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  const footer = document.querySelector('.footer');

  if (bgVideo && !prefersReducedMotion) {
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const t = Math.min(scrollY / maxScroll, 1);

      // Ease in-out
      const eased = t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;

      // Scale 1.1 → 1.4, shift up 0 → 120px — scale covers the edge bleed
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

  // ---------- Smooth anchor offset for sticky nav ----------
  // CSS handles smooth-scroll; this adds offset for the sticky header height.
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
