/**
 * carousel.js — Vanilla JS carousel for projects slider
 * (Replaces Swiper.js dependency with a lightweight custom implementation)
 */
(function () {
  'use strict';

  const track = document.querySelector('.swiper-wrapper');
  const slides = document.querySelectorAll('.project-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.swiper-dot');

  if (!track || !slides.length) return;

  let current = 0;
  let slidesPerView = getSlidesPerView();
  let maxIndex = Math.max(0, slides.length - slidesPerView);

  function getSlidesPerView() {
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function goTo(index) {
    index = Math.max(0, Math.min(index, maxIndex));
    current = index;

    const slideWidth = slides[0].offsetWidth + 24; // gap = 24px
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = 'translateX(-' + (index * slideWidth) + 'px)';

    // Update dots
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });

    // Update button states
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index >= maxIndex;
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goTo(i); });
  });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      goTo(delta > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  // Resize handler
  window.addEventListener('resize', function () {
    slidesPerView = getSlidesPerView();
    maxIndex = Math.max(0, slides.length - slidesPerView);
    goTo(Math.min(current, maxIndex));
  });

  // Init
  goTo(0);

})();
