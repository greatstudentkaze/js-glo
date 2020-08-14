'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function start() {
    do {
        money = prompt('Ваш месячный доход?', '50000');
    } while (!isNumber(money))
}

let money;
start();

const appData = {
    budget: money,
    budgetMonth: 0,
    budgetDay: 0,
    income: {},
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    mission: 40000,
    period: 4,
    asking: function () {
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Квартира, Еда');

        appData.addExpenses = addExpenses.toLowerCase().split(', ');

        for (let i = 0; i < 2; i++) {
            const key = prompt('Введите обязательную статью расходов:', 'Квартира').toLowerCase();
            let value;

            do {
                value = prompt('Во сколько это обойдется?', '10000');
            } while (!isNumber(value));

            appData.expenses[key] = +value;
        }

        appData.deposit = confirm('Нажмите "OK", если у Вас есть депозит в банке');
    },
    getExpensesMonth: function () {
        let sum = 0;

        for (let expense in appData.expenses) {
            sum += appData.expenses[expense];
        }

        return sum;
    },
    getAccumulatedMonth: function () {
        return money - expensesMonth;
    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / accumulatedMonth);
    },
    getStatusIncome: function () {
        if (budgetDay >= 1200) {
            return ('У Вас высокий уровень дохода!');
        } else if (budgetDay >= 600) {
            return ('У Вас средний уровень дохода.');
        } else if (budgetDay >= 0) {
            return ('К сожалению, у Вас уровень дохода ниже среднего :(');
        } else {
            return ('Что-то пошло не так О_о');
        }
    }
}

appData.asking();

const expenses = [],
    expensesMonth = appData.getExpensesMonth(),
    accumulatedMonth = appData.getAccumulatedMonth(),
    targetMonth = appData.getTargetMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30);


console.log('Сумма обязательных расходов за месяц: ' + expensesMonth);

console.log('Возможные расходы: ');
console.log(appData.addExpenses);

console.log(targetMonth > 0 ? 'Цель будет достигнута за: ' + targetMonth + ' мес.' : 'Цель не будет достигнута');

console.log('Бюджет на день: ' + budgetDay);

console.log(appData.getStatusIncome());
