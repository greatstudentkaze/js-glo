const money = prompt('Ваш месячный доход?'),
    income = 'инвестиции',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:'),
    expense1 = prompt('Введите обязательную статью расходов:'),
    amount1 = prompt('Во сколько это обойдется?'),
    expense2 = prompt('Введите обязательную статью расходов:'),
    amount2 = prompt('Во сколько это обойдется?'),
    deposit = confirm('Есть ли у Вас депозит в банке?'),
    budgetMonth = money - amount1 - amount2,
    mission = 40000,
    period = 4,
    missionReach = Math.ceil(mission / budgetMonth),
    budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяца');
console.log('Цель - заработать ' + mission + ' рублей');
console.log('Цель будет достигнута за: ' + missionReach + ' мес.');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);

console.log(budgetMonth);