let money = 60000,
    income = 'инвестиции',
    addExpenses = 'питание, еда, квартира, проезд, одежда',
    deposit = true,
    mission = 40000,
    period = 4;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяца');
console.log('Цель - заработать ' + mission + ' рублей');

addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

let budgetDay = money / 30;
console.log(budgetDay);