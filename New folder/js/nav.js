/**
 * nav.js — Mega-menu, mobile hamburger, scroll behavior, active states
 */
(function () {
  'use strict';

  const nav = document.getElementById('site-nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const mobileItemToggles = document.querySelectorAll('.nav__mobile-link[data-toggle]');

  /* ---- Scroll: add class for background ---- */
  let lastScroll = 0;
  function onScroll() {
    const y = window.scrollY;
    if (y > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile hamburger ---- */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---- Mobile sub-menu accordion ---- */
  mobileItemToggles.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = link.dataset.toggle;
      const sub = document.getElementById(targetId);
      if (!sub) return;
      const open = sub.classList.toggle('open');
      const icon = link.querySelector('.toggle-icon');
      if (icon) icon.textContent = open ? '−' : '+';
    });
  });

  /* ---- Keyboard: close mega-menu on Escape ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        hamburger.click();
      }
    }
  });

  /* ---- Active nav link highlight ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link[href]').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.style.color = 'var(--color-accent)';
    }
  });

  /* ---- Trap focus inside mobile menu when open ---- */
  // (simplified — full production would use a focus trap library)

})();
