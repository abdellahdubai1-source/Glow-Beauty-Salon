/* ==========================================================================
   GLOW BEAUTY SALON — GALLERY.JS
   Category filtering, lightbox viewer, and before/after comparison slider.
   Only runs on pages that contain a .gallery-masonry element.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     GALLERY FILTERING
     ------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-masonry .gallery-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      galleryItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        item.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });


  /* ------------------------------------------------------------------
     LIGHTBOX
     ------------------------------------------------------------------ */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-content img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  // Build a live array of currently visible gallery images (respects filter state)
  const getVisibleItems = () =>
    Array.from(galleryItems).filter((item) => !item.classList.contains('is-hidden'));

  let currentIndex = 0;

  const openLightbox = (index) => {
    const visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    currentIndex = index;
    const item = visibleItems[currentIndex];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.getAttribute('data-caption') || img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const showRelative = (direction) => {
    const visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentIndex];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.getAttribute('data-caption') || img.alt;
  };

  if (lightbox) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const visibleItems = getVisibleItems();
        const index = visibleItems.indexOf(item);
        openLightbox(index);
      });
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', () => showRelative(-1));
    lightboxNext?.addEventListener('click', () => showRelative(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showRelative(-1);
      if (e.key === 'ArrowRight') showRelative(1);
    });
  }


  /* ------------------------------------------------------------------
     BEFORE / AFTER SLIDER
     Drag the handle (or tap/click anywhere on the slider) to reveal
     more or less of the "after" image.
     ------------------------------------------------------------------ */
  const baSliders = document.querySelectorAll('.before-after-slider');

  baSliders.forEach((slider) => {
    const afterImage = slider.querySelector('.after-image');
    const handle = slider.querySelector('.ba-handle');
    let isDragging = false;

    const updatePosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let percent = ((clientX - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      afterImage.style.clipPath = `inset(0 0 0 ${percent}%)`;
      handle.style.left = `${percent}%`;
    };

    handle?.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) updatePosition(e.clientX);
    });

    slider.addEventListener('click', (e) => {
      updatePosition(e.clientX);
    });

    // Touch support
    handle?.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) updatePosition(e.touches[0].clientX);
    }, { passive: true });
  });

});
