const money = 60000,
    income = 'инвестиции',
    addExpenses = 'питание, еда, квартира, проезд, одежда',
    deposit = true,
    mission = 40000,
    period = 4,
    budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяца');
console.log('Цель - заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);