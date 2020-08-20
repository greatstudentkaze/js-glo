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
  addExpensesInput = document.querySelector('.additional_expenses-item'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodInput = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  titleInputs = document.querySelectorAll('[placeholder="Наименование"]'),
  amountInputs = document.querySelectorAll('[placeholder="Сумма"]');

let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');

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
    appData.budget = +budgetInput.value;

    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddIncome();
    appData.getAddExpenses();
    appData.showResult();
  },
  addIncomeBlock: function () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';

    incomeAddBtn.before(cloneIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length >= 3) incomeAddBtn.style.display = 'none';
  },
  getIncome: function () {
    incomeItems.forEach(item => {
      const itemIncome = item.querySelector('.income-title').value.trim(),
        cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome.toLowerCase()] = +cashIncome;
      }
    });

    for (let income in appData.income) {
      appData.incomeMonth += appData.income[income];
    }
  },
  addExpensesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

    expenseAddBtn.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length >= 3) expenseAddBtn.style.display = 'none';
  },
  getExpenses: function () {
    expensesItems.forEach(item => {
      const itemExpenses = item.querySelector('.expenses-title').value.trim(),
        cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses.toLowerCase()] = +cashExpenses;
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
    periodInput.addEventListener('input', () => incomePeriodOutput.value = appData.calcSavedMoney());
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
  },
  watchPeriodInput: function () {
    periodAmount.textContent = periodInput.value;
  }
}
calculateBtn.disabled = true;
budgetInput.addEventListener('input', () => calculateBtn.disabled = budgetInput.value === '');
titleInputs.forEach(item => {
  item.addEventListener('input', (evt) => {
    item.value = item.value.replace(/[^а-яё, ]/gi, '');
  });
});
amountInputs.forEach(item => {
  item.addEventListener('keydown', evt => {
    if (evt.key < '0' || evt.key > '9') evt.preventDefault();
  });
});

calculateBtn.addEventListener('click', appData.start);
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);
expenseAddBtn.addEventListener('click', appData.addExpensesBlock);
periodInput.addEventListener('input', appData.watchPeriodInput);

// console.log(appData.targetMonth > 0 ? 'Цель будет достигнута за: ' + appData.targetMonth + ' мес.' : 'Цель не будет достигнута');



