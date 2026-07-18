/**
 * form.js
 * Task 6 requirement: volunteer registration form with client-side
 * validation for name, email, phone, interest, and message. No backend —
 * a valid submission simply displays a success banner and resets the form.
 */

const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('volunteerForm');
  const successBanner = document.getElementById('formSuccessBanner');
  if (!form) return;

  const fields = {
    name: form.querySelector('#volName'),
    email: form.querySelector('#volEmail'),
    phone: form.querySelector('#volPhone'),
    interest: form.querySelector('#volInterest'),
    message: form.querySelector('#volMessage'),
  };

  // Validate a field as the user leaves it, for immediate feedback.
  Object.values(fields).forEach((field) => {
    if (!field) return;
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      // Clear an error state as soon as the field becomes valid again.
      if (field.classList.contains('is-invalid') && isFieldValid(field)) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    hideSuccessBanner(successBanner);

    const validations = Object.values(fields).map((field) => field && validateField(field));
    const allValid = validations.every(Boolean);

    if (!allValid) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend is wired up for this project — simulate a successful
    // submission entirely on the client.
    showSuccessBanner(successBanner);
    form.reset();
    Object.values(fields).forEach((field) => {
      if (field) field.classList.remove('is-valid', 'is-invalid');
    });
  });

  form.addEventListener('reset', () => {
    hideSuccessBanner(successBanner);
    Object.values(fields).forEach((field) => {
      if (field) field.classList.remove('is-valid', 'is-invalid');
    });
  });
});

function validateField(field) {
  const valid = isFieldValid(field);
  field.classList.toggle('is-invalid', !valid);
  field.classList.toggle('is-valid', valid);
  return valid;
}

function isFieldValid(field) {
  const value = field.value.trim();

  switch (field.name) {
    case 'name':
      return value.length >= 2;
    case 'email':
      return EMAIL_PATTERN.test(value);
    case 'phone':
      return PHONE_PATTERN.test(value);
    case 'interest':
      return value !== '';
    case 'message':
      return value.length >= 10;
    default:
      return field.checkValidity();
  }
}

function showSuccessBanner(banner) {
  if (!banner) return;
  banner.classList.add('is-visible');
  banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideSuccessBanner(banner) {
  if (!banner) return;
  banner.classList.remove('is-visible');
}
