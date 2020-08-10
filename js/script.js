// 1
const lang = prompt('Введите язык, на котором нужно вывести дни недели (ru/en):', 'ru'),
    daysOfTheWeekRu = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
    ],
    daysOfTheWeekEn = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ],
    daysOfTheWeek = [daysOfTheWeekRu, daysOfTheWeekEn];

if (lang === 'ru') {
    console.log('Дни недели на русском языке:');
    daysOfTheWeek[0].forEach(item => console.log('\t' + item));
} else if (lang === 'en') {
    console.log('Дни недели на английском языке:');
    daysOfTheWeek[1].forEach(item => console.log('\t' + item));
} else {
    console.log('Ошибка при вводе');
}

console.log('\n');

switch (lang) {
    case 'ru':
        console.log('Дни недели на русском языке:');
        daysOfTheWeek[0].forEach(item => console.log('\t' + item));
        break;
    case 'en':
        console.log('Дни недели на английском языке:');
        daysOfTheWeek[1].forEach(item => console.log('\t' + item));
        break;
    default:
        console.log('Ошибка при вводе');
}

console.log('\n');

daysOfTheWeek[2] = ['Ошибка при вводе языка'];

console.log('Дни недели (' + lang + '):');
daysOfTheWeek[Number(lang === 'en') + Number(lang !== 'ru' && lang !== 'en') * 2]
    .forEach(item => console.log('\t' + item));

console.log('\n');

// 2
const namePerson = prompt('Введите имя:', 'Иван');

namePerson === 'Артем' ? console.log('директор') : namePerson === 'Максим'
    ? console.log('преподаватель') : console.log('студент');