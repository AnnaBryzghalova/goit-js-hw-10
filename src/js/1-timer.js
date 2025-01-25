import flatpickr from 'flatpickr';
import { showError } from './izi-toast-api';

const fpOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const isFutureDate = selectedDates[0] > Date.now();
    startButton.disabled = !isFutureDate;

    if (!isFutureDate) {
      showError('Please choose a date in the future');
    }
  },
};

const dateTimePicker = document.querySelector('#datetime-picker');
const fp = flatpickr(dateTimePicker, fpOptions);
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;

startButton.addEventListener('click', () => {
  tryStartTimer();
});

import Timer from './timer';
const timer = new Timer({
  daysElement: document.querySelector('.timer span[data-days]'),
  hoursElement: document.querySelector('.timer span[data-hours]'),
  minutesElement: document.querySelector('.timer span[data-minutes]'),
  secondsElement: document.querySelector('.timer span[data-seconds]'),
  interval: 1000,
  onFinish() {
    dateTimePicker.disabled = false;
  },
});

function tryStartTimer() {
  try {
    timer.start(fp.selectedDates[0].getTime());
    dateTimePicker.disabled = true;
    startButton.disabled = true;
  } catch (error) {
    startButton.disabled = true;
    console.error(error.message);
  }
}
