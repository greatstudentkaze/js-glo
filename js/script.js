document.body.insertAdjacentHTML('afterbegin', '<ul class="week"></ul>');

const week = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
  ],
  weekList = document.querySelector('.week'),
  russianDay = new Date().toLocaleString('ru', {weekday: 'long'});


week.forEach((item) => {
  const weekItem = document.createElement('li');
  weekItem.classList.add('week__day');

    if (item === 'Суббота' || item === 'Воскресенье') {
      weekItem.style.fontStyle = 'italic';
      console.log(item)
    }

    if (item.toLowerCase() === russianDay) {
      weekItem.style.fontWeight = 'bold';
    }

    weekItem.textContent = item;
    weekList.appendChild(weekItem);
});

