'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

function start() {
    do {
        money = prompt('Ваш месячный доход?', '50000');
    } while (!isNumber(money))
}

start();

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 40000,
    period: 4,
    asking: function () {
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Квартира, Еда');

        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Нажмите "OK", если у Вас есть депозит в банке');

    }
}

const
    expenses = [],
    expensesAmount = getExpensesMonth(),
    accumulatedMonth = getAccumulatedMonth(),
    targetMonth = getTargetMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30);

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
    return Math.ceil(appData.mission / accumulatedMonth);
}

console.log('Сумма обязательных расходов за месяц: ' + expensesAmount);

console.log('Возможные расходы: ');

console.log(targetMonth > 0 ? 'Цель будет достигнута за: ' + targetMonth + ' мес.' : 'Цель не будет достигнута');

console.log('Бюджет на день: ' + budgetDay);

console.log(getStatusIncome());
