(function () {
  var SHEETY_URL =
    'https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/customob/newsletter';

  function setMessage(el, text, isError) {
    el.textContent = text;
    el.classList.remove('d-none', 'text-success', 'text-danger');
    el.classList.add(isError ? 'text-danger' : 'text-success');
  }

  document.querySelectorAll('form.newsletter-form').forEach(function (form) {
    var msg = form.parentNode.querySelector('.newsletter-form-message');
    if (!msg) {
      msg = document.createElement('p');
      msg.className =
        'newsletter-form-message mt-2 mb-0 small text-success d-none';
      msg.setAttribute('role', 'status');
      msg.setAttribute('aria-live', 'polite');
      form.parentNode.insertBefore(msg, form.nextSibling);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var submitBtn = form.querySelector('button[type="submit"]');
      if (!emailInput || !submitBtn) return;

      var email = emailInput.value.trim();
      if (!email || !emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      submitBtn.disabled = true;
      msg.classList.add('d-none');
      msg.textContent = '';

      var currentDatetime = new Date().toISOString();
      var body = {
        newsletter: {
          email: email,
          date: currentDatetime,
        },
      };
      fetch(SHEETY_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })
          .then(function (response) {
            if (!response.ok) {
              throw new Error('Eroare la trimitere');
            }
          setMessage(
            msg,
            'Mulțumim! Te-ai abonat cu succes la newsletter.',
            false
          );
          form.reset();
        });
    });
  });
})();
