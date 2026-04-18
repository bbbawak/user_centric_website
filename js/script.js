(function () {
  const body = document.body;
  const panel = document.getElementById('accessibility-panel');
  const settingsButton = document.getElementById('settings-button');
  const resetButton = document.getElementById('reset-preferences');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  const applyPreferences = (theme, font) => {
    body.classList.remove('theme-dark', 'themehighcontrast', 'font-small', 'font-medium', 'font-large');

    if (theme === 'dark') body.classList.add('theme-dark');
    if (theme === 'highcontrast') body.classList.add('themehighcontrast');

    if (font === 'small') body.classList.add('font-small');
    if (font === 'large') body.classList.add('font-large');
    if (!font || font === 'medium') body.classList.add('font-medium');
  };

  let storedTheme = localStorage.getItem('theme') || 'default';
  if (storedTheme === 'high-contrast') {
    storedTheme = 'highcontrast';
    localStorage.setItem('theme', storedTheme);
  }
  const storedFont = localStorage.getItem('font') || 'medium';
  applyPreferences(storedTheme, storedFont);

  if (settingsButton && panel) {
    settingsButton.addEventListener('click', () => {
      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      settingsButton.setAttribute('aria-expanded', String(!isOpen));
    });

    panel.addEventListener('click', (event) => {
      const theme = event.target.getAttribute('data-theme');
      const font = event.target.getAttribute('data-font');

      if (theme) {
        localStorage.setItem('theme', theme);
        applyPreferences(theme, localStorage.getItem('font') || 'medium');
      }

      if (font) {
        localStorage.setItem('font', font);
        applyPreferences(localStorage.getItem('theme') || 'default', font);
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      localStorage.setItem('theme', 'default');
      localStorage.setItem('font', 'medium');
      applyPreferences('default', 'medium');
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const langButtons = document.querySelectorAll('.lang-switch__btn');
  const applyLang = (code) => {
    const safe = code === 'fr' || code === 'es' ? code : 'en';
    document.documentElement.lang = safe;
    localStorage.setItem('lang', safe);
    langButtons.forEach((btn) => {
      const on = btn.getAttribute('data-lang') === safe;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  };

  if (langButtons.length) {
    applyLang(localStorage.getItem('lang') || 'en');
    langButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang) applyLang(lang);
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        if (formStatus) formStatus.textContent = 'Please complete the required fields before submitting.';
        contactForm.reportValidity();
        return;
      }

      event.preventDefault();
      if (formStatus) formStatus.textContent = 'Sending your message...';
      window.location.href = 'success.html';
    });
  }
})();
