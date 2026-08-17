const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.setAttribute('aria-label', 'Open menu');

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => {
    setMenu(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenu(false);
    }
  });

  document.addEventListener('click', (event) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setMenu(false);
    }
  });
}

// Subtle active-page treatment for the primary navigation.
if (nav) {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a:not(.nav-cta)').forEach((link) => {
    const linkFile = (link.getAttribute('href') || '').split('/').pop() || 'index.html';
    if (linkFile === currentFile) {
      link.classList.add('current-page');
      link.setAttribute('aria-current', 'page');
    }
  });

  const activeNavStyle = document.createElement('style');
  activeNavStyle.textContent = `
    .site-nav a.current-page{
      text-decoration:underline;
      text-underline-offset:6px;
      text-decoration-thickness:1px;
      text-decoration-color:var(--taupe);
    }
  `;
  document.head.appendChild(activeNavStyle);
}

// Keep the Instagram destination and public handle consistent sitewide.
document
  .querySelectorAll(
    'a[href*="instagram.com/vowandveilevents"], a[href*="instagram.com/vowveilevents"]'
  )
  .forEach((link) => {
    link.href = 'https://www.instagram.com/vowveilevents/';

    if (link.textContent.trim().startsWith('@')) {
      link.textContent = '@vowveilevents';
    }
  });

// Submit the inquiry form without leaving the site and show a clear confirmation.
const inquiryForm = document.querySelector('#inquiry-form');
if (inquiryForm) {
  const submitButton = inquiryForm.querySelector('button[type="submit"]');
  const status = inquiryForm.querySelector('#form-status');

  inquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
    }
    if (status) {
      status.hidden = true;
      status.textContent = '';
    }

    try {
      const response = await fetch(inquiryForm.action, {
        method: 'POST',
        body: new FormData(inquiryForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Submission failed');

      inquiryForm.reset();
      if (status) {
        status.textContent = 'Thank you. Your inquiry has been received. We will be in touch soon.';
        status.hidden = false;
        status.focus();
      }
    } catch (error) {
      if (status) {
        status.textContent = 'We could not send your inquiry. Please try again or call 323.910.0789.';
        status.hidden = false;
        status.focus();
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Inquiry';
      }
    }
  });
}
