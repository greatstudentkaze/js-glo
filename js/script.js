'use strict';

const declensionTime = (n, words) => {
  if (n % 10 === 1 && Math.floor(n / 10) !== 1) {
    n += ` ${words[0]}`;
  } else if (n % 10 >= 2 && n % 10 <= 4 && Math.floor(n / 10) !== 1) {
    n += ` ${words[1]}`;
  } else {
    n += ` ${words[2]}`;
  }

  return n;
};

const addZero = number => number.toString().length === 1 ? `0${number}` : number;

const getDatetimeA = () => {
  const date = new Date();

  const dateA = date.toLocaleString('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedDateA = 'Сегодня ' + dateA[0].toUpperCase() + dateA.slice(1).replace('г.', 'года');

  const timeAh = declensionTime(date.getHours(), ['час', 'часа', 'часов']),
    timeAm = declensionTime(date.getMinutes(), ['минута', 'минуты', 'минут']),
    timeAs = declensionTime(date.getSeconds(), ['секунда', 'секунды', 'секунд']);

  return formattedDateA + ', ' + timeAh + ' ' + timeAm + ' ' + timeAs;
};

const getDatetimeB = () => {
  const date = new Date();

  const datetimeB = date.toLocaleString('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });

    return datetimeB.replace(', ', ' - ');
};

const datetimeAItem = document.createElement('p'),
  datetimeBItem = document.createElement('p');

datetimeAItem.classList.add('datetime', 'datetime--a');
datetimeAItem.textContent = 'а) ' + getDatetimeA();
document.body.append(datetimeAItem);

datetimeBItem.classList.add('datetime', 'datetime--b');
datetimeBItem.textContent = 'б) ' + getDatetimeB();
document.body.append(datetimeBItem);

const datetimeOutput = () => {
  setInterval(() => {
    datetimeAItem.textContent = 'а) ' + getDatetimeA();
    datetimeBItem.textContent = 'б) ' + getDatetimeB();
  }, 1000);
};

datetimeOutput();
