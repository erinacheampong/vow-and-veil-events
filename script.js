const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.setAttribute('aria-label', 'Open menu');

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (event) => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
  });
}

// Keep the Instagram destination and public handle consistent sitewide.
document.querySelectorAll('a[href*="instagram.com/vowandveilevents"], a[href*="instagram.com/vowveilevents"]').forEach((link) => {
  link.href = 'https://www.instagram.com/vowveilevents/';
  if (link.textContent.trim().startsWith('@')) link.textContent = '@vowveilevents';
});

const form = document.querySelector('#inquiry-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const picked = (name) => [...form.querySelectorAll(`[name="${name}"]:checked`)].map(el => el.value).join(', ');
    const subject = encodeURIComponent(`Vow & Veil Event Inquiry — ${data.get('name') || 'New Client'}`);
    const body = encodeURIComponent([
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Event date: ${data.get('date') || ''}`,
      `Location / venue: ${data.get('location') || ''}`,
      `Event type: ${picked('event_type')}`,
      `Estimated guest count: ${data.get('guests') || ''}`,
      `Service: ${picked('service')}`,
      '',
      `About the event:`,
      data.get('message') || ''
    ].join('\n'));
    window.location.href = `mailto:erin@vowandveilevents.com?subject=${subject}&body=${body}`;
  });
}
