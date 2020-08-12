'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

(function () {
    do {
        money = prompt('Ваш месячный доход?', '50000');
    } while (!isNumber(money))
}())

const
    income = 'инвестиции',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Квартира, Еда'),
    expenses = [],
    expensesAmount = getExpensesMonth(),
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
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        let expenseAmount;

        expenses[i] = prompt('Введите обязательную статью расходов:', 'Квартира').toLowerCase();
        do {
            expenseAmount = prompt('Во сколько это обойдется?', '10000');
        } while (!isNumber(expenseAmount))
        sum += +expenseAmount;
    }

    return sum;
}

function getAccumulatedMonth() {
    return money - expensesAmount;
}

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Сумма обязательных расходов за месяц: ' + expensesAmount);

console.log('Возможные расходы: ');
console.log(addExpenses.toLowerCase().split(', '));

console.log('Цель будет достигнута за: ' + getTargetMonth() + ' мес.');

console.log('Бюджет на день: ' + budgetDay);

console.log(getStatusIncome());
