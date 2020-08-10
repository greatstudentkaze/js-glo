const money = prompt('Ваш месячный доход?', '50000'),
    income = 'инвестиции',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Квартира, Еда'),
    expense1 = prompt('Введите обязательную статью расходов:', 'Квартира').toLowerCase(),
    amount1 = prompt('Во сколько это обойдется?', '20000'),
    expense2 = prompt('Введите обязательную статью расходов:', 'Еда').toLowerCase(),
    amount2 = prompt('Во сколько это обойдется?', '10000'),
    deposit = confirm('Нажмите "OK", если у Вас есть депозит в банке'),
    budgetMonth = money - amount1 - amount2,
    mission = 40000,
    period = 4,
    missionReach = Math.ceil(mission / budgetMonth),
    budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' мес.');
console.log('Цель - заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ' + budgetMonth);

console.log('Цель будет достигнута за: ' + missionReach + ' мес.');

console.log('Бюджет на день: ' + budgetDay);