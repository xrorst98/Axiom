/**
 * projects-filter.js — Filterable project directory
 * Dual-axis filter (Market × Region) with URL param support.
 */
(function () {
  'use strict';

  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.project-card[data-market][data-region]');
  const countEl = document.getElementById('project-count');
  const noResults = document.querySelector('.no-results');

  if (!chips.length || !cards.length) return;

  let activeMarket = 'all';
  let activeRegion = 'all';

  /* ---- Read initial URL params ---- */
  const params = new URLSearchParams(window.location.search);
  if (params.get('market')) activeMarket = params.get('market');
  if (params.get('region')) activeRegion = params.get('region');

  /* ---- Apply filters ---- */
  function applyFilters() {
    let visible = 0;

    cards.forEach(function (card) {
      const market = card.dataset.market;
      const region = card.dataset.region;

      const matchMarket = activeMarket === 'all' || market === activeMarket;
      const matchRegion = activeRegion === 'all' || region === activeRegion;

      const show = matchMarket && matchRegion;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? ' project' : ' projects');
    }

    if (noResults) {
      noResults.style.display = visible === 0 ? '' : 'none';
    }

    // Update URL params without page reload
    const newParams = new URLSearchParams();
    if (activeMarket !== 'all') newParams.set('market', activeMarket);
    if (activeRegion !== 'all') newParams.set('region', activeRegion);
    const newUrl = window.location.pathname + (newParams.toString() ? '?' + newParams.toString() : '');
    history.replaceState(null, '', newUrl);
  }

  /* ---- Chip click handler ---- */
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const type  = chip.dataset.filterType;
      const value = chip.dataset.filterValue;

      // Update active chip in group
      document.querySelectorAll('.filter-chip[data-filter-type="' + type + '"]').forEach(function (c) {
        c.classList.remove('active', 'active-accent');
      });

      if (type === 'market') {
        activeMarket = value;
        chip.classList.add('active');
      } else if (type === 'region') {
        activeRegion = value;
        chip.classList.add('active-accent');
      }

      applyFilters();
    });

    // Highlight active chip based on URL params
    if (chip.dataset.filterType === 'market' && chip.dataset.filterValue === activeMarket) {
      chip.classList.add('active');
    }
    if (chip.dataset.filterType === 'region' && chip.dataset.filterValue === activeRegion) {
      chip.classList.add('active-accent');
    }
  });

  // Initial run
  applyFilters();

})();
