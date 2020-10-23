'use strict';

const employers = ['АртеМ', 'максим', 'Владимир', 'сергей', 'НикиТа', 'евГений', ' Дарья', ' ', 'виктория ', 'ЕкаТерина', '', ' Андрей ', 'КИРИЛЛ'];
const nameCourse = 'Базовый React';
const command = employers.filter(employer => employer.trim())
	.map(name => name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase());

const data = {
	cash: [3, 8, 3],
	react: ['JSX', 'components', 'props', 'state', 'hooks'],
	add: ['styled-components', 'firebase']
};

const { cash, react, react: [first], add } = data;

const calcCash = everyCash => everyCash.reduce((total, item) => total + item, 0);

const lesson = calcCash(cash);

const makeBusiness = (director, allModule, gang, course, teacher = 'Максим') => {
	const sumTech = [...react, ...add, 'и другие'];

	console.log(`Стартуем новый курс: ${course}. Владелец: ${director}, преподаватель: ${teacher}. Всего уроков: ${allModule}. \nКоманда Академии: ${gang}`);
	console.log(`Первое что изучим будет ${first}. Он очень похож на HTML!`);
	console.log('Технологии которые мы изучим:');
	console.log(...sumTech);
}

makeBusiness('Артем', lesson, command, nameCourse);
