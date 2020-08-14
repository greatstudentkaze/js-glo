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
        for (let expense in appData.expenses) {
            appData.expensesMonth += appData.expenses[expense];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return ('У Вас высокий уровень дохода!');
        } else if (appData.budgetDay >= 600) {
            return ('У Вас средний уровень дохода.');
        } else if (appData.budgetDay >= 0) {
            return ('К сожалению, у Вас уровень дохода ниже среднего :(');
        } else {
            return ('Что-то пошло не так О_о');
        }
    }
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

const targetMonth = appData.getTargetMonth();




console.log('Сумма обязательных расходов за месяц: ' + appData.expensesMonth);

console.log('Возможные расходы: ');
console.log(appData.addExpenses);

console.log(targetMonth > 0 ? 'Цель будет достигнута за: ' + targetMonth + ' мес.' : 'Цель не будет достигнута');

console.log('Бюджет на день: ' + appData.budgetDay);

console.log(appData.getStatusIncome());
