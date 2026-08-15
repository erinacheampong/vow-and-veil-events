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
