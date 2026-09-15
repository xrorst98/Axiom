/**
 * search.js — Global search overlay
 * Opens on search button click or Cmd/Ctrl+K.
 */
(function () {
  'use strict';

  const overlay = document.getElementById('search-overlay');
  const input   = document.querySelector('#search-overlay input[type="search"]');
  const closeBtn = document.getElementById('search-close');
  const openBtns = document.querySelectorAll('[data-search-open]');
  const hints = document.querySelectorAll('.search-hint');

  if (!overlay) return;

  function openSearch() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { if (input) input.focus(); }, 100);
  }

  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (input) input.value = '';
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', openSearch);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  // Click outside to close
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  // Keyboard shortcut Cmd/Ctrl+K
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeSearch();
    }
  });

  // Hint chips populate input
  hints.forEach(function (hint) {
    hint.addEventListener('click', function () {
      if (input) {
        input.value = hint.textContent;
        input.focus();
      }
    });
  });

})();
