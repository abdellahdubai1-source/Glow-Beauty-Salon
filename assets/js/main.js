/* ==========================================================================
   GLOW BEAUTY SALON — MAIN.JS
   Core site interactions: loading screen, navbar, mobile menu, scroll
   progress, back-to-top, smooth scroll, active nav state, FAQ accordion,
   testimonial slider, newsletter form.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. LOADING SCREEN
     Hide once the window has fully loaded (or after a minimum luxury
     "breathing" delay so it never feels like a flash).
     ------------------------------------------------------------------ */
  const loadingScreen = document.querySelector('.loading-screen');

  const hideLoadingScreen = () => {
    if (!loadingScreen) return;
    loadingScreen.classList.add('is-hidden');
    // Remove from tab order / a11y tree once hidden
    loadingScreen.setAttribute('aria-hidden', 'true');
  };

  window.addEventListener('load', () => {
    // Minimum display time so the animation is never jarring on fast loads
    const minimumDisplay = 700;
    setTimeout(hideLoadingScreen, minimumDisplay);
  });

  // Safety fallback in case 'load' is delayed by slow third-party assets
  setTimeout(hideLoadingScreen, 4000);


  /* ------------------------------------------------------------------
     2. STICKY / GLASSMORPHISM NAVBAR
     ------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const scrollThreshold = 40;

  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });


  /* ------------------------------------------------------------------
     3. MOBILE MENU TOGGLE
     ------------------------------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-links a');

  const openMobileMenu = () => {
    mobileMenu.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu with Escape key for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });


  /* ------------------------------------------------------------------
     4. SCROLL PROGRESS BAR
     ------------------------------------------------------------------ */
  const progressBar = document.querySelector('.scroll-progress');

  const updateScrollProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);


  /* ------------------------------------------------------------------
     5. BACK TO TOP BUTTON
     ------------------------------------------------------------------ */
  const backToTopBtn = document.querySelector('.back-to-top');
  const backToTopThreshold = 480;

  const handleBackToTopVisibility = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > backToTopThreshold) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  };

  handleBackToTopVisibility();
  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ------------------------------------------------------------------
     6. SMOOTH SCROLL for in-page anchor links
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });


  /* ------------------------------------------------------------------
     7. ACTIVE NAV STATE (highlights current section while scrolling)
     ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const setActiveNavLink = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 80;

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navAnchors.forEach((link) => {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('is-active');
      }
    });
  };

  if (sections.length && navAnchors.length) {
    setActiveNavLink();
    window.addEventListener('scroll', setActiveNavLink, { passive: true });
  }


  /* ------------------------------------------------------------------
     8. FAQ ACCORDION
     ------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other open items (single-open accordion behavior)
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });


  /* ------------------------------------------------------------------
     9. TESTIMONIAL SLIDER
     ------------------------------------------------------------------ */
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentSlide = 0;
  let testimonialInterval;

  const showSlide = (index) => {
    if (!testimonialSlides.length) return;
    testimonialSlides.forEach((slide) => slide.classList.remove('is-active'));
    testimonialDots.forEach((dot) => dot.classList.remove('is-active'));

    currentSlide = (index + testimonialSlides.length) % testimonialSlides.length;

    testimonialSlides[currentSlide].classList.add('is-active');
    if (testimonialDots[currentSlide]) {
      testimonialDots[currentSlide].classList.add('is-active');
    }
  };

  const startAutoRotate = () => {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => showSlide(currentSlide + 1), 6000);
  };

  if (testimonialSlides.length) {
    showSlide(0);
    startAutoRotate();

    prevBtn?.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startAutoRotate();
    });

    nextBtn?.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startAutoRotate();
    });

    testimonialDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        startAutoRotate();
      });
    });

    // Pause auto-rotation when the user hovers the slider
    const sliderWrapper = document.querySelector('.testimonials-slider');
    sliderWrapper?.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    sliderWrapper?.addEventListener('mouseleave', startAutoRotate);
  }


  /* ------------------------------------------------------------------
     10. NEWSLETTER FORM (client-side validation + confirmation message)
     ------------------------------------------------------------------ */
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const note = newsletterForm.parentElement.querySelector('.newsletter-note');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailInput.value || !emailPattern.test(emailInput.value)) {
        note.textContent = 'Please enter a valid email address.';
        note.style.color = 'var(--color-error)';
        return;
      }

      note.textContent = 'Welcome to the Glow beauty circle — check your inbox soon.';
      note.style.color = 'var(--color-success)';
      emailInput.value = '';
    });
  }

});
