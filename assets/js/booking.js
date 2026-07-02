/* ==========================================================================
   GLOW BEAUTY SALON — BOOKING.JS
   Multi-step appointment form: service/date/time selection, client details,
   validation, live summary sidebar, and success confirmation.
   Only runs on appointment.html (guards check for .booking-card).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const bookingCard = document.querySelector('.booking-card');
  if (!bookingCard) return;

  const steps = Array.from(document.querySelectorAll('.form-step'));
  const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
  const nextButtons = document.querySelectorAll('[data-form-next]');
  const prevButtons = document.querySelectorAll('[data-form-prev]');
  const bookingForm = document.querySelector('#booking-form');
  const bookingSuccess = document.querySelector('.booking-success');

  let currentStep = 0;

  const bookingState = {
    service: '',
    servicePrice: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
  };

  /* ------------------------------------------------------------------
     STEP NAVIGATION
     ------------------------------------------------------------------ */
  const showStep = (index) => {
    steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    progressSteps.forEach((ps, i) => {
      ps.classList.toggle('is-active', i === index);
      ps.classList.toggle('is-complete', i < index);
    });
    currentStep = index;
    bookingCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ------------------------------------------------------------------
     VALIDATION
     Validates only the fields inside the currently visible step.
     ------------------------------------------------------------------ */
  const validateStep = (index) => {
    let isValid = true;
    const step = steps[index];
    if (!step) return true;

    // Step 0: service selection (radio group)
    if (step.querySelector('.service-option-grid')) {
      const selected = step.querySelector('input[name="service"]:checked');
      const errorEl = step.querySelector('.form-error');
      if (!selected) {
        isValid = false;
        if (errorEl) errorEl.style.display = 'block';
      } else {
        if (errorEl) errorEl.style.display = 'none';
        bookingState.service = selected.closest('.service-option').querySelector('strong').textContent;
        bookingState.servicePrice = selected.closest('.service-option').querySelector('span').textContent;
      }
    }

    // Step 1: date + time
    if (step.querySelector('#booking-date')) {
      const dateInput = step.querySelector('#booking-date');
      const dateGroup = dateInput.closest('.form-group');
      if (!dateInput.value) {
        isValid = false;
        dateGroup.classList.add('has-error');
      } else {
        dateGroup.classList.remove('has-error');
        bookingState.date = dateInput.value;
      }

      const selectedTime = step.querySelector('.time-slot.is-selected');
      const timeError = step.querySelector('.time-error');
      if (!selectedTime) {
        isValid = false;
        if (timeError) timeError.style.display = 'block';
      } else {
        if (timeError) timeError.style.display = 'none';
        bookingState.time = selectedTime.textContent.trim();
      }
    }

    // Step 2: client details
    if (step.querySelector('#client-name')) {
      const nameInput = step.querySelector('#client-name');
      const phoneInput = step.querySelector('#client-phone');
      const emailInput = step.querySelector('#client-email');
      const phonePattern = /^[+\d][\d\s-]{6,}$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      [nameInput, phoneInput, emailInput].forEach((input) => {
        const group = input.closest('.form-group');
        let fieldValid = true;

        if (input === nameInput && input.value.trim().length < 2) fieldValid = false;
        if (input === phoneInput && !phonePattern.test(input.value.trim())) fieldValid = false;
        if (input === emailInput && !emailPattern.test(input.value.trim())) fieldValid = false;

        group.classList.toggle('has-error', !fieldValid);
        if (!fieldValid) isValid = false;
      });

      if (isValid) {
        bookingState.name = nameInput.value.trim();
        bookingState.phone = phoneInput.value.trim();
        bookingState.email = emailInput.value.trim();
      }
    }

    return isValid;
  };

  /* ------------------------------------------------------------------
     SUMMARY SIDEBAR
     ------------------------------------------------------------------ */
  const updateSummary = () => {
    const summaryService = document.querySelector('[data-summary="service"]');
    const summaryDate = document.querySelector('[data-summary="date"]');
    const summaryTime = document.querySelector('[data-summary="time"]');
    const summaryName = document.querySelector('[data-summary="name"]');

    if (summaryService) summaryService.textContent = bookingState.service || '—';
    if (summaryDate) summaryDate.textContent = bookingState.date || '—';
    if (summaryTime) summaryTime.textContent = bookingState.time || '—';
    if (summaryName) summaryName.textContent = bookingState.name || '—';
  };

  /* ------------------------------------------------------------------
     SERVICE OPTION SELECTION (visual state)
     ------------------------------------------------------------------ */
  document.querySelectorAll('.service-option input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.service-option').forEach((opt) => opt.classList.remove('is-selected'));
      radio.closest('.service-option').classList.add('is-selected');
      updateSummary();
    });
  });

  /* ------------------------------------------------------------------
     TIME SLOT SELECTION
     ------------------------------------------------------------------ */
  document.querySelectorAll('.time-slot').forEach((slot) => {
    slot.addEventListener('click', () => {
      document.querySelectorAll('.time-slot').forEach((s) => s.classList.remove('is-selected'));
      slot.classList.add('is-selected');
      updateSummary();
    });
  });

  /* ------------------------------------------------------------------
     NEXT / PREV BUTTONS
     ------------------------------------------------------------------ */
  nextButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        updateSummary();
        if (currentStep < steps.length - 1) {
          showStep(currentStep + 1);
        }
      }
    });
  });

  prevButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) showStep(currentStep - 1);
    });
  });

  /* ------------------------------------------------------------------
     FORM SUBMISSION
     ------------------------------------------------------------------ */
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateStep(currentStep)) return;

      updateSummary();

      // Populate the final success message with booking details
      const successDetails = document.querySelector('.booking-success-details');
      if (successDetails) {
        successDetails.textContent = `${bookingState.service} on ${bookingState.date} at ${bookingState.time}`;
      }

      bookingForm.style.display = 'none';
      document.querySelector('.progress-steps').style.display = 'none';
      if (bookingSuccess) {
        bookingSuccess.classList.add('is-visible');
      }
    });
  }

  // Initialize first step
  showStep(0);

});
