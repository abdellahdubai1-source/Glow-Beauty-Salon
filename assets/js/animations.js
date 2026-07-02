/* ==========================================================================
   GLOW BEAUTY SALON — ANIMATIONS.JS
   Scroll-reveal engine and animated trust-badge counters, powered by
   IntersectionObserver. Respects prefers-reduced-motion.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     SCROLL REVEAL
     Any element with [data-reveal] fades/slides in once it enters the
     viewport. Optional [data-reveal-delay="1-6"] staggers siblings.
     ------------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // No animation: just make everything visible immediately.
    revealTargets.forEach((el) => el.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  }


  /* ------------------------------------------------------------------
     ANIMATED TRUST-BADGE / STAT COUNTERS
     Any element with [data-count-to="1200"] counts up from 0 once
     visible. Optional [data-count-suffix="+"] appends a suffix.
     ------------------------------------------------------------------ */
  const counters = document.querySelectorAll('[data-count-to]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
    const suffix = el.getAttribute('data-count-suffix') || '';
    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(eased * target);
      el.textContent = `${currentValue.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target.toLocaleString()}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
      const suffix = el.getAttribute('data-count-suffix') || '';
      el.textContent = `${target.toLocaleString()}${suffix}`;
    });
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  }


  /* ------------------------------------------------------------------
     HERO PARALLAX (desktop only, disabled on touch/mobile for
     performance, per the approved Design System's animation rules)
     ------------------------------------------------------------------ */
  const heroBg = document.querySelector('.hero-bg img');
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  if (heroBg && isDesktop && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.15}px) scale(1.05)`;
      }
    }, { passive: true });
  }

});
