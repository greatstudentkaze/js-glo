'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const arrayCapitalizeString = function (array) {
    return array.map(item => item[0].toUpperCase() + item.slice(1)).join(', ');
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 40000,
    targetMonth: 0,
    period: 4,
    asking: function () {

        if (confirm('Нажмите "OK", если у Вас есть дополнительный заработок')) {
            let itemIncome,
                cashIncome;

            do {
                itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Инвестиции');
            } while (!isNaN(parseFloat(itemIncome)) || !itemIncome);
            do {
                cashIncome = prompt('Сколько в месяц Вы зарабатываете на этом?', '10000');
            } while (!isNumber(cashIncome));

            appData.income[itemIncome.toLowerCase()] = +cashIncome;
        }

        let addExpenses;
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Квартира, Еда');
        } while (!isNaN(parseFloat(addExpenses)) || !addExpenses);

        appData.addExpenses = addExpenses.toLowerCase().split(', ');

        for (let i = 0; i < 2; i++) {
            let itemExpense,
                cashExpense;

            do {
                itemExpense = prompt('Введите обязательную статью расходов:', 'Квартира');
            } while (!isNaN(parseFloat(itemExpense)) || !itemExpense)
            do {
                cashExpense = prompt('Во сколько это обойдется?', '10000');
            } while (!isNumber(cashExpense));

            appData.expenses[itemExpense.toLowerCase()] = +cashExpense;
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
        appData.targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
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
    },
    getDepositInfo: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = +prompt('Какой годовой процент?', '3.3');
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Сумма обязательных расходов за месяц: ' + appData.expensesMonth);

console.log(appData.targetMonth > 0 ? 'Цель будет достигнута за: ' + appData.targetMonth + ' мес.' : 'Цель не будет достигнута');

console.log(appData.getStatusIncome());

console.log('\n');

console.log('Наша программа включает в себя данные:');
for (let data in appData) {
    console.log(data, ': ', appData[data]);
}

console.log(arrayCapitalizeString(appData.addExpenses));