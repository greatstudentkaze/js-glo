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

const newYearTimer = () => {
  const greeting = document.getElementById('greeting'),
    dayOfWeek = document.getElementById('day-of-week'),
    currentTime = document.getElementById('current-time'),
    remainingDays = document.getElementById('remaining-days');

  const getGreeting = (date) => {
    const currentHour = date.getHours();
    if (currentHour >= 16) return  'Добрый вечер!';
    else if (currentHour >= 12) return 'Добрый день!';
    else if (currentHour >= 5) return  'Доброе утро!';
    else return 'Доброй ночи!';
  };

  const getRemainingDays = (startDate, deadline) => {
    const dateStart = startDate.getTime(),
      dateStop = deadline.getTime();

    return Math.floor((dateStop - dateStart) / 1000 / 3600 / 24);
  };

  const getTimeInfo = () => {
    const date = new Date(),
      newYearDate = new Date(`01 january ${date.getFullYear() + 1}`);

    return {
      greeting: getGreeting(date),
      dayOfWeek: date.toLocaleString('ru', {weekday: 'long'}),
      currentTime: date.toLocaleTimeString('en'),
      remainingDays: getRemainingDays(date, newYearDate)
    };
  };

  const setTimeInfo = () => {
    const timer = getTimeInfo();

    greeting.textContent = timer.greeting;
    currentTime.textContent = timer.currentTime;
    dayOfWeek.textContent = timer.dayOfWeek;
    remainingDays.textContent = declensionTime(timer.remainingDays, ['день', 'дня', 'дней']);
  };

  setTimeInfo();
  setInterval(setTimeInfo, 1000);
};

newYearTimer();