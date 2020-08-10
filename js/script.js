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
    daysOfTheWeek = new Map([
        ['ru', daysOfTheWeekRu],
        ['en', daysOfTheWeekEn]
    ]);

if (lang === 'ru') {
    console.log('Дни недели на русском языке:');
    console.log(daysOfTheWeekRu);
} else if (lang === 'en') {
    console.log('Дни недели на английском языке:');
    console.log(daysOfTheWeekEn);
} else {
    console.log('Ошибка при вводе языка');
}

console.log('\n');

switch (lang) {
    case 'ru':
        console.log('Дни недели на русском языке:');
        console.log(daysOfTheWeekRu);
        break;
    case 'en':
        console.log('Дни недели на английском языке:');
        console.log(daysOfTheWeekEn);
        break;
    default:
        console.log('Ошибка при вводе языка');
}

console.log('\n');

console.log('Дни недели (' + lang + '):');
console.log(daysOfTheWeek.get(lang));

console.log('\n');

// 2
const namePerson = prompt('Введите имя:', 'Иван');

namePerson === 'Артем' ? console.log('директор') : namePerson === 'Максим'
    ? console.log('преподаватель') : console.log('студент');