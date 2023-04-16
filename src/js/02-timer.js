
import flatpickr from 'flatpickr';
import convertMs from './dateConverts';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const imputDatePickerEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

btnStartEl.setAttribute('disabled', true);
btnStartEl.addEventListener('click', onBtnStart);

flatpickr(imputDatePickerEl, options);

window.addEventListener('keydown', evt => {
  if ((evt.code === 'Escape' && timerId) ) {
    clearInterval(timerId);

    imputDatePickerEl.removeAttribute('disabled');
    btnStartEl.removeAttribute('disabled');

    secondsEl.textContent = '00';
    minutesEl.textContent = '00';
    hoursEl.textContent = '00';
    daysEl.textContent = '00';
    
  }
}

);


function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStartEl.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
     }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  btnStartEl.removeAttribute('disabled');
  
}


function startTimer() {
  btnStartEl.setAttribute('disabled', true);
  imputDatePickerEl.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (secondsEl.textContent <= 0 && minutesEl.textContent <= 0) {
    Notify.success('Time end');
    clearInterval(timerId);

   imputDatePickerEl.removeAttribute('disabled');
   


  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}


function renderDate(formatDate) {
  secondsEl.textContent = formatDate.seconds;
  minutesEl.textContent = formatDate.minutes;
  hoursEl.textContent = formatDate.hours;
  daysEl.textContent = formatDate.days;
   
}
