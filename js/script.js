// 1
const lang = prompt('Введите язык, на котором нужно вывести дни недели (ru/en):', 'ru'),
    daysOfTheWeek = [
        [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
            'Воскресенье'
        ],
        [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ]
    ];

if (lang === 'ru') {
    console.log('Дни недели на русском языке:');
    console.log(daysOfTheWeek[0]);
} else if (lang === 'en') {
    console.log('Дни недели на английском языке:');
    console.log(daysOfTheWeek[1]);
} else {
    console.log('Ошибка при вводе языка');
}

console.log('\n');

switch (lang) {
    case 'ru':
        console.log('Дни недели на русском языке:');
        console.log(daysOfTheWeek[0]);
        break;
    case 'en':
        console.log('Дни недели на английском языке:');
        console.log(daysOfTheWeek[1]);
        break;
    default:
        console.log('Ошибка при вводе языка');
}

console.log('\n');

console.log('Дни недели (' + lang + '):');
console.log(daysOfTheWeek[Number(lang === 'en')]);

console.log('\n');

// 2
const namePerson = prompt('Введите имя:', 'Иван');

namePerson === 'Артем' ? console.log('директор') : namePerson === 'Максим'
    ? console.log('преподаватель') : console.log('студент');