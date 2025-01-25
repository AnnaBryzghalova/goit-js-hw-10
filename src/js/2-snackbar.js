const form = document.querySelector('form.form');
form.addEventListener('submit', onFormSubmit);
form.state[0].checked = true;

import { showError, showMessage } from './izi-toast-api';

function onFormSubmit(event) {
  event.preventDefault();

  const ms = Number.parseInt(form.delay.value);
  if (ms < 0) {
    showError('Please enter a positive number');
    form.delay.focus();
    return;
  }

  const fulfilled = form.state.value === 'fulfilled';
  createPromise(ms, fulfilled)
    .then(message => {
      showMessage(message);
    })
    .catch(message => {
      showError(message);
    });

  form.delay.value = '';
  form.delay.focus();
}

function createPromise(ms, fulfilled) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilled) {
        resolve(`Fulfilled promise in ${ms}ms`);
      } else {
        reject(`Rejected promise in ${ms}ms`);
      }
    }, ms);
  });
}
