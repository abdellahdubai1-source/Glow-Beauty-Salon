/* ==========================================================================
   GLOW BEAUTY SALON — FAQ.JS
   Live FAQ search/filter for faq.html. The accordion open/close behavior
   itself is handled globally by main.js (.faq-item / .faq-question), so
   this file focuses purely on search filtering across all FAQ items.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const searchInput = document.querySelector('.faq-search-wrap input');
  if (!searchInput) return;

  const faqItems = document.querySelectorAll('.faq-item');
  const categoryTitles = document.querySelectorAll('.faq-category-title');
  const noResults = document.querySelector('.faq-no-results');

  const normalize = (str) => str.toLowerCase().trim();

  const filterFaqs = () => {
    const query = normalize(searchInput.value);
    let anyVisible = false;

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question')?.textContent || '';
      const answer = item.querySelector('.faq-answer')?.textContent || '';
      const matches = normalize(question).includes(query) || normalize(answer).includes(query);

      item.classList.toggle('is-search-hidden', !matches);
      if (matches) anyVisible = true;
    });

    // Hide category headings that have no visible questions beneath them
    categoryTitles.forEach((title) => {
      let sibling = title.nextElementSibling;
      let hasVisible = false;
      while (sibling && !sibling.classList.contains('faq-category-title')) {
        if (sibling.classList.contains('faq-item') && !sibling.classList.contains('is-search-hidden')) {
          hasVisible = true;
        }
        sibling = sibling.nextElementSibling;
      }
      title.style.display = hasVisible ? '' : 'none';
    });

    if (noResults) {
      noResults.classList.toggle('is-visible', !anyVisible && query.length > 0);
    }
  };

  searchInput.addEventListener('input', filterFaqs);

});
