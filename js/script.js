'use strict';

const employers = ['АртеМ', 'максим', 'Владимир', 'сергей', 'НикиТа', 'евГений', ' Дарья', ' ', 'виктория ', 'ЕкаТерина', '', ' Андрей ', 'КИРИЛЛ'];
const nameCourse = 'Базовый React';
let command = employers.filter(employer => employer.trim());

command = command.map(item => {
	item = item.toLowerCase().trim();
	item = item[0].toUpperCase() + item.slice(1);

	return item;
});

const data = {
	cash: [3, 8, 3],
	react: ['JSX', 'components', 'props', 'state', 'hooks'],
	add: ['styled-components', 'firebase']
};

const calcCash = (own = 0, ...args) => {
	const everyCash = args[0];

	return everyCash.reduce((total, item) => total + item, own);
}

const { cash, react, add } = data;

const lesson = calcCash(null, cash);

const makeBusiness = (director, teacher = 'Максим', allModule, gang, course) => {
	const sumTech = [...react, ...add, 'и другие'];

	console.log(`Стартуем новый курс: ${course}. Владелец: ${director}, преподаватель: ${teacher}. Всего уроков: ${allModule}. \nКоманда Академии: ${gang}`);
	console.log(`Первое что изучим будет ${react[0]}. Он очень похож на HTML!`);
	console.log('Технологии которые мы изучим:');
	console.log(...sumTech);
}

makeBusiness(...['Артем', null, lesson, command, nameCourse]);
