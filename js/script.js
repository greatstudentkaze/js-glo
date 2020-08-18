'use strict';

const declensionTime = (hour, min, sec) => {
  if (hour % 10 === 1 && Math.floor(hour / 10) !== 1) {
    hour += ' час';
  } else if (hour % 10 >= 2 && hour % 10 <= 4 && Math.floor(hour / 10) !== 1) {
    hour += ' часа';
  } else {
    hour += ' часов';
  }

  if (min % 10 === 1 && Math.floor(min / 10) !== 1) {
    min += ' минута';
  } else if (min % 10 >= 2 && min % 10 <= 4 && Math.floor(min / 10) !== 1) {
    min += ' минуты';
  } else {
    min += ' минут';
  }

  if (sec % 10 === 1 && Math.floor(sec / 10) !== 1) {
    sec += ' секунда';
  } else if (sec % 10 >= 2 && sec % 10 <= 4 && Math.floor(sec / 10) !== 1) {
    sec += ' секунды';
  } else {
    sec += ' секунд';
  }

  return hour + ' ' + min + ' ' + sec;
};

const addZero = (number) => {
  if (Math.floor(number / 10) === 0) return Number('0' + number);
  else return number;
};

const getDatetimeA = () => {
  const date = new Date();

  let dateA = date.toLocaleString('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  dateA = 'Сегодня ' + dateA[0].toUpperCase() + dateA.slice(1);
  dateA = dateA.replace('г.', 'года');

  const timeA = declensionTime(date.getHours(), date.getMinutes(), date.getSeconds());

  return dateA + ', ' + timeA;
};

const getDatetimeB = () => {
  const date = new Date();

  const dateB = date.toLocaleString('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }),
    timeB = new Date().toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });

    return dateB + ' - ' + timeB;
};

document.body.insertAdjacentHTML('afterbegin', '<p class="datetime datetime--b">б) ' + getDatetimeB() + '</p>');
document.body.insertAdjacentHTML('afterbegin', '<p class="datetime datetime--a">а) ' + getDatetimeA() + '</p>');

const datetimeAItem = document.querySelector('.datetime--a'),
  datetimeBItem = document.querySelector('.datetime--b');

const datetimeOutput = () => {
  setInterval(() => {
    datetimeAItem.textContent = getDatetimeA();
    datetimeBItem.textContent = getDatetimeB();
  }, 1000);
};

datetimeOutput();
