'use strict';

const calculateBtn = document.getElementById('start'),
  incomeAddBtn = document.getElementsByTagName('button')[0],
  expenseAddBtn = document.getElementsByTagName('button')[1],
  depositCheck = document.getElementById('deposit-check'),
  addIncomeInput = document.querySelectorAll('.additional_income-item'),
  budgetMonthInput = document.querySelector('.budget_month-value'),
  budgetDayInput = document.getElementsByClassName('result-total')[1],
  expensesMonthOutput = document.getElementsByClassName('result-total')[2],
  addIncomeOutput = document.getElementsByClassName('result-total')[3],
  addExpensesOutput = document.getElementsByClassName('result-total')[4],
  incomePeriodOutput = document.getElementsByClassName('result-total')[5],
  targetMonthOutput = document.getElementsByClassName('result-total')[6],
  budgetInput = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title[type="text"]'),
  incomeItemsInput = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelector('.expenses-title[type="text"]'),
  addExpensesInput = document.querySelector('.additional_expenses-item'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodInput = document.querySelector('.period-select');

let expensesItems = document.querySelectorAll('.expenses-items');

'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const arrayCapitalizeString = function (array) {
  return array.map(item => item[0].toUpperCase() + item.slice(1)).join(', ');
};

const appData = {
  budget: 0,
  budgetMonth: 0,
  budgetDay: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  mission: 40000,
  start: function ()  {
    if (budgetInput.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = +budgetInput.value;
    // todo проверка на число

    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddIncome();
    appData.getAddExpenses();
    appData.showResult();
  },
  addExpensesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);

    expenseAddBtn.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length >= 3) expenseAddBtn.style.display = 'none';
  },
  getExpenses: function () {
    expensesItems.forEach(item => {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
        // todo добавить проверку на число
      }
    });
  },
  getAddExpenses: function () {
    const addExpenses = addExpensesInput.value.split(', ');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') appData.addExpenses.push(item.toLowerCase());
    });
  },
  getIncome: function () {
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

    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },
  getAddIncome: function () {
    addIncomeInput.forEach(item => {
      const itemValue = item.value.trim();
      if (itemValue !== '') appData.addIncome.push(itemValue.toLowerCase());
    });
  },
  showResult: function () {
    budgetMonthInput.value = appData.budgetMonth;
    budgetDayInput.value = appData.budgetDay;
    expensesMonthOutput.value = appData.expensesMonth;
    addIncomeOutput.value = arrayCapitalizeString(appData.addIncome);
    addExpensesOutput.value = arrayCapitalizeString(appData.addExpenses);
    incomePeriodOutput.value = appData.calcSavedMoney();
    targetMonthOutput.value = appData.getTargetMonth();
  },
  asking: function () {
    appData.deposit = confirm('Нажмите "OK", если у Вас есть депозит в банке');
  },
  getExpensesMonth: function () {
    for (let expense in appData.expenses) {
      appData.expensesMonth += appData.expenses[expense];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    return appData.budgetMonth * periodInput.value;
  }
}

calculateBtn.addEventListener('click', appData.start);

expenseAddBtn.addEventListener('click', appData.addExpensesBlock);

// console.log(appData.targetMonth > 0 ? 'Цель будет достигнута за: ' + appData.targetMonth + ' мес.' : 'Цель не будет достигнута');



