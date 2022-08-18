// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_green.css');
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const daysTime = document.querySelector('[data-days]');
const hoursTime = document.querySelector('[data-hours]');
const minutesTime = document.querySelector('[data-minutes]');
const secondsTime = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true);

const DOM_ELEMENTS_CONFIG = {
  days: daysTime,
  hours: hoursTime,
  minutes: minutesTime,
  seconds: secondsTime,
};

class Timer {
  startDate = null;
  timeDelta = null;
  intervalId = null;
  isActive = false;
  start() {
    if (this.isActive || !this.startDate) {
      return;
    }
    this.isActive = true;
    const currentTime = Date.now();
    this.timeDelta = this.startDate - currentTime;

    this.intervalId = setInterval(() => {
      if (this.timeDelta <= 0) {
        clearInterval(this.intevalId);
        Notiflix.Notify.info('Timer has finished!');
        this.timeDelta = null;
        this.startDate = null;
        return;
      }
      const time = this.convertMs(this.timeDelta);
      this.updateClockTime(time);
      this.timeDelta = this.timeDelta - 1000;
    }, 1000);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  setTextContent(domelem, value) {
    domelem.textContent = this.addLeadingZero(value);
  }

  updateClockTime(dateConvert) {
    for (const dateConvertKey in dateConvert) {
      this.setTextContent(
        DOM_ELEMENTS_CONFIG[dateConvertKey],
        dateConvert[dateConvertKey]
      );
    }
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const timer1 = new Timer();

const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      timer1.startDate = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', () => {
  timer1.start();
});
