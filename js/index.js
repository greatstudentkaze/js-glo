'use strict';

const dataInputBlock = document.querySelector('.data'),
  calculateBtn = document.getElementById('start'),
  resetBtn = document.getElementById('cancel'),
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

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const arrayCapitalizeString = function (array) {
  return array.map(item => item[0].toUpperCase() + item.slice(1)).join(', ');
};

const AppData = function () {

  this.budget = 0;
  this.budgetMonth = 0;
  this.budgetDay = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.mission = 40000;
};

AppData.prototype.start = function () {
  this.budget = +budgetInput.value;

  this.getIncome();
  this.getExpenses();
  this.getExpensesMonth();
  this.getBudget();
  this.getAddIncome();
  this.getAddExpenses();
  this.showResult();

  dataInputBlock.querySelectorAll('input[type="text"]')
    .forEach(item => item.disabled = true);

  incomeAddBtn.disabled = true;
  expenseAddBtn.disabled = true;
  depositCheck.disabled = true;

  calculateBtn.style.display = 'none';
  resetBtn.style.display = 'inline-block';
};

AppData.prototype.reset = function () {
  this.budget = 0;
  this.budgetMonth = 0;
  this.budgetDay = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.mission = 40000;

  dataInputBlock.querySelectorAll('input[type="text"]')
    .forEach(item => {
      item.value = '';
      item.disabled = false;
    });

  for (let i = incomeItems.length-1; i > 0; i--) {
    incomeItems[i].remove();
  }
  incomeAddBtn.style.display = '';
  for (let i = expensesItems.length-1; i > 0; i--) {
    expensesItems[i].remove();
  }
  expenseAddBtn.style.display = '';

  periodInput.value = '1';
  periodAmount.textContent = '1';

  incomeAddBtn.disabled = false;
  expenseAddBtn.disabled = false;
  depositCheck.disabled = false;
  depositCheck.checked = false;

  document.querySelectorAll('.result-total')
    .forEach(item => item.value = '');
  calculateBtn.style.display = '';
  calculateBtn.disabled = true;
  resetBtn.style.display = '';
};

AppData.prototype.addIncomeBlock = function () {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector('.income-title').value = '';
  cloneIncomeItem.querySelector('.income-amount').value = '';
  cloneIncomeItem.querySelector('.income-title').addEventListener('input', evt => evt.target.value = evt.target.value.replace(/[^а-яё, ]/gi, ''));
  cloneIncomeItem.querySelector('.income-amount').addEventListener('input', evt => evt.target.value = evt.target.value.replace(/[^0-9.]/, ''));

  incomeAddBtn.before(cloneIncomeItem);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length >= 3) incomeAddBtn.style.display = 'none';
};

AppData.prototype.getIncome = function () {
  incomeItems.forEach(item => {
    const itemIncome = item.querySelector('.income-title').value.trim(),
      cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome.toLowerCase()] = +cashIncome;
    }
  });

  for (let income in this.income) {
    this.incomeMonth += this.income[income];
  }
};

AppData.prototype.addExpensesBlock = function () {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector('.expenses-title').value = '';
  cloneExpensesItem.querySelector('.expenses-amount').value = '';
  cloneExpensesItem.querySelector('.expenses-title').addEventListener('input', evt => evt.target.value = evt.target.value.replace(/[^а-яё, ]/gi, ''));
  cloneExpensesItem.querySelector('.expenses-amount').addEventListener('input', evt => evt.target.value = evt.target.value.replace(/[^0-9.]/, ''));

  amountInputs.forEach(item => {
    item.addEventListener('input', () => item.value = item.value.replace(/[^0-9.]/, ''));
  });

  expenseAddBtn.before(cloneExpensesItem);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length >= 3) expenseAddBtn.style.display = 'none';
};

AppData.prototype.getExpenses = function () {
  expensesItems.forEach(item => {
    const itemExpenses = item.querySelector('.expenses-title').value.trim(),
      cashExpenses = item.querySelector('.expenses-amount').value;

    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses.toLowerCase()] = +cashExpenses;
    }
  });
};

AppData.prototype.getAddExpenses = function () {
  const addExpenses = addExpensesInput.value.split(', ');
  addExpenses.forEach(item => {
    item = item.trim();
    if (item !== '') this.addExpenses.push(item.toLowerCase());
  });
};

AppData.prototype.getAddIncome = function () {
  addIncomeInput.forEach(item => {
    const itemValue = item.value.trim();
    if (itemValue !== '') this.addIncome.push(itemValue.toLowerCase());
  });
};

AppData.prototype.showResult = function () {
  budgetMonthInput.value = this.budgetMonth;
  budgetDayInput.value = this.budgetDay;
  expensesMonthOutput.value = this.expensesMonth;
  addIncomeOutput.value = arrayCapitalizeString(this.addIncome);
  addExpensesOutput.value = arrayCapitalizeString(this.addExpenses);
  incomePeriodOutput.value = this.calcSavedMoney();
  periodInput.addEventListener('input', () => incomePeriodOutput.value = this.calcSavedMoney());
  targetMonthOutput.value = this.getTargetMonth();
};

AppData.prototype.asking = function () {
  this.deposit = confirm('Нажмите "OK", если у Вас есть депозит в банке');
};

AppData.prototype.getExpensesMonth = function () {
  for (let expense in this.expenses) {
    this.expensesMonth += this.expenses[expense];
  }
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return ('У Вас высокий уровень дохода!');
  } else if (this.budgetDay >= 600) {
    return ('У Вас средний уровень дохода.');
  } else if (this.budgetDay >= 0) {
    return ('К сожалению, у Вас уровень дохода ниже среднего :(');
  } else {
    return ('Что-то пошло не так О_о');
  }
};

AppData.prototype.getDepositInfo = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = +prompt('Какой годовой процент?', '3.3');
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
    } while (!isNumber(this.moneyDeposit));
  }
};

AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodInput.value;
};

AppData.prototype.watchPeriodInput = function () {
  periodAmount.textContent = periodInput.value;
};

const appData = new AppData();

calculateBtn.disabled = true;
budgetInput.addEventListener('input', () => calculateBtn.disabled = budgetInput.value === '');
titleInputs.forEach(item => {
  item.addEventListener('input', () => item.value = item.value.replace(/[^а-яё, ]/gi, ''));
});
amountInputs.forEach(item => {
  item.addEventListener('input', () => item.value = item.value.replace(/[^0-9.]/, ''));
});

calculateBtn.addEventListener('click', appData.start.bind(appData));
resetBtn.addEventListener('click', appData.reset.bind(appData));
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);
expenseAddBtn.addEventListener('click', appData.addExpensesBlock);
periodInput.addEventListener('input', appData.watchPeriodInput);

// console.log(appData.targetMonth > 0 ? 'Цель будет достигнута за: ' + appData.targetMonth + ' мес.' : 'Цель не будет достигнута');



