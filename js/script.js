'use strict';

const money = +prompt('Ваш месячный доход?', '50000'),
    income = 'инвестиции',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Квартира, Еда'),
    expense1 = prompt('Введите обязательную статью расходов:', 'Квартира').toLowerCase(),
    amount1 = +prompt('Во сколько это обойдется?', '20000'),
    expense2 = prompt('Введите обязательную статью расходов:', 'Еда').toLowerCase(),
    amount2 = +prompt('Во сколько это обойдется?', '10000'),
    deposit = confirm('Нажмите "OK", если у Вас есть депозит в банке'),
    accumulatedMonth = getAccumulatedMonth(),
    mission = 40000,
    period = 4,
    budgetDay = Math.floor(accumulatedMonth / 30);

const showTypeOf = function (data) {
    console.log(data, typeof data);
};

const getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return ('У Вас высокий уровень дохода!');
    } else if (budgetDay >= 600) {
        return ('У Вас средний уровень дохода.');
    } else if (budgetDay >= 0) {
        return ('К сожалению, у Вас уровень дохода ниже среднего :(');
    } else {
        return ('Что-то пошло не так О_о');
    }
};

function getExpensesMonth() {
    return amount1 + amount2;
}

function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Сумма обязательных расходов за месяц: ' + getExpensesMonth());

console.log('Возможные расходы: ');
console.log(addExpenses.toLowerCase().split(', '));

console.log('Цель будет достигнута за: ' + getTargetMonth() + ' мес.');

console.log('Бюджет на день: ' + budgetDay);

console.log(getStatusIncome());
