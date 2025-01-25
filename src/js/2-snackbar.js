let formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form');
const key = 'feedback-form-state';

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

import * as ls from './local-storage-api';
loadData();

function loadData() {
  const savedData = ls.getItem(key);
  if (savedData !== null) {
    formData = savedData;
    form.elements.email.value = savedData.email;
    form.elements.message.value = savedData.message;
  }
}

function onFormInput(event) {
  const input = event.target;
  formData[input.name] = input.value;
  ls.setItem(key, formData);
}

function onFormSubmit(event) {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  formData = { email: '', message: '' };
  form.reset();
  localStorage.removeItem(key);
}
