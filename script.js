const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

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
