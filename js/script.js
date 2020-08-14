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
    weekList = document.querySelector('.week');

week.forEach((item, i) => {
    const date = new Date();

    if (i === 5 || i === 6) {
        item = `<i>${item}</i>`;
    }

    // i + 1, т.к. метод getDay() возвращает номер дня недели начиная с воскресенья
    if (i + 1 === date.getDay()) {
        item = `<b>${item}</b>`;
    }

    weekList.insertAdjacentHTML('beforeend', `<li class="week__day">${item}</li>`);
});

