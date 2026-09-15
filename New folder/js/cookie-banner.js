/**
 * cookie-banner.js — Accept All / Essential Only consent banner
 * Persists choice to localStorage.
 */
(function () {
  'use strict';

  const COOKIE_KEY = 'axiom_cookie_consent';
  const banner = document.getElementById('cookie-banner');
  const btnAcceptAll = document.getElementById('cookie-accept-all');
  const btnEssential = document.getElementById('cookie-essential-only');

  if (!banner) return;

  // Show banner if no preference stored
  const stored = localStorage.getItem(COOKIE_KEY);
  if (!stored) {
    setTimeout(function () {
      banner.classList.remove('hidden');
    }, 1200);
  }

  function dismissBanner(consent) {
    localStorage.setItem(COOKIE_KEY, consent);
    banner.classList.add('hidden');
    // Emit a custom event for analytics hooks
    window.dispatchEvent(new CustomEvent('cookieConsent', { detail: { consent: consent } }));
  }

  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', function () {
      dismissBanner('all');
    });
  }

  if (btnEssential) {
    btnEssential.addEventListener('click', function () {
      dismissBanner('essential');
    });
  }

})();
