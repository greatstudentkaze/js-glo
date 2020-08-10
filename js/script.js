const lang = prompt('Введите язык, на котором нужно вывести дни недели (ru/en):', 'ru'),
    ru = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
    ],
    en = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ],
    daysOfTheWeek = [ru, en];

if (lang === 'ru') {
    console.log('Дни недели на русском языке:');
    daysOfTheWeek['ru'].forEach(item => console.log('\t' + item));
} else if (lang === 'en') {
    console.log('Дни недели на английском языке:');
    daysOfTheWeek['en'].forEach(item => console.log('\t' + item));
} else {
    console.log('Ошибка при вводе');
}

console.log('\n');

switch (lang) {
    case 'ru':
        console.log('Дни недели на русском языке:');
        daysOfTheWeek['ru'].forEach(item => console.log('\t' + item));
        break;
    case 'en':
        console.log('Дни недели на английском языке:');
        daysOfTheWeek['en'].forEach(item => console.log('\t' + item));
        break;
    default:
        console.log('Ошибка при вводе');
}

console.log('\n');

