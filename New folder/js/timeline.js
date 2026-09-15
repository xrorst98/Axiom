/**
 * timeline.js — Interactive decade history timeline
 * Tab switching with animated content reveal.
 */
(function () {
  'use strict';

  const tabs = document.querySelectorAll('.decade-tab');
  const panels = document.querySelectorAll('.decade-content');

  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = tab.dataset.decade;

      // Deactivate all tabs
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      // Hide all panels
      panels.forEach(function (panel) {
        if (panel.classList.contains('active')) {
          panel.classList.remove('active');
        }
      });

      // Show target panel with animation
      const targetPanel = document.querySelector('.decade-content[data-decade="' + target + '"]');
      if (targetPanel) {
        // Trigger reflow for animation
        void targetPanel.offsetWidth;
        targetPanel.classList.add('active');
      }
    });
  });

})();
