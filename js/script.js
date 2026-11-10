document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }));
  }

  if (window.lucide) window.lucide.createIcons();

  // Front-end demonstration only: connect this form to your team's backend before launch.
  const form = document.getElementById('booking-form');
  const message = document.getElementById('booking-message');
  const dateInput = document.getElementById('preferred-date');
  const submit = document.getElementById('booking-submit');
  if (form && message && dateInput) {
    const today = new Date();
    dateInput.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (dateInput.value < dateInput.min) {
        message.textContent = 'Please choose today or a future date.';
        message.className = 'form-message error';
        dateInput.focus();
        return;
      }
      message.textContent = 'Your request details are valid. This front-end demo does not save or send appointments yet; connect the form to the clinic backend.';
      message.className = 'form-message';
      if (submit) submit.disabled = true;
      // Avoid implying that a real appointment was booked or transmitted.
      window.setTimeout(() => { if (submit) submit.disabled = false; }, 900);
    });
  }
});
