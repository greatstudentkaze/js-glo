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
  },
  reset: function () {
    dataInputBlock.querySelectorAll('input[type="text"]')
      .forEach(item => {
        item.value = '';
        item.disabled = false;
      });
    periodInput.value = '1';
    periodAmount.textContent = '1';

    incomeAddBtn.disabled = false;
    expenseAddBtn.disabled = false;
    depositCheck.disabled = false;

    document.querySelectorAll('.result-total')
      .forEach(item => item.value = '');
    calculateBtn.style.display = '';
    resetBtn.style.display = '';

  },
  addIncomeBlock: function () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    cloneIncomeItem.querySelector('.income-title').addEventListener('input', evt => evt.target.value = evt.target.value.replace(/[^а-яё, ]/gi, ''));
    cloneIncomeItem.querySelector('.income-amount').addEventListener('keydown', evt => {
      if (evt.key < '0' || evt.key > '9') evt.preventDefault();
    });

    incomeAddBtn.before(cloneIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length >= 3) incomeAddBtn.style.display = 'none';
  },
  getIncome: function () {
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
  },
  addExpensesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    cloneExpensesItem.querySelector('.expenses-title').addEventListener('input', evt => evt.target.value = evt.target.value.replace(/[^а-яё, ]/gi, ''));
    cloneExpensesItem.querySelector('.expenses-amount').addEventListener('keydown', evt => {
      if (evt.key < '0' || evt.key > '9') evt.preventDefault();
    });

    expenseAddBtn.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length >= 3) expenseAddBtn.style.display = 'none';
  },
  getExpenses: function () {
    expensesItems.forEach(item => {
      const itemExpenses = item.querySelector('.expenses-title').value.trim(),
        cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses.toLowerCase()] = +cashExpenses;
      }
    });
  },
  getAddExpenses: function () {
    const addExpenses = addExpensesInput.value.split(', ');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') this.addExpenses.push(item.toLowerCase());
    });
  },
  getAddIncome: function () {
    addIncomeInput.forEach(item => {
      const itemValue = item.value.trim();
      if (itemValue !== '') this.addIncome.push(itemValue.toLowerCase());
    });
  },
  showResult: function () {
    budgetMonthInput.value = this.budgetMonth;
    budgetDayInput.value = this.budgetDay;
    expensesMonthOutput.value = this.expensesMonth;
    addIncomeOutput.value = arrayCapitalizeString(this.addIncome);
    addExpensesOutput.value = arrayCapitalizeString(this.addExpenses);
    incomePeriodOutput.value = this.calcSavedMoney();
    periodInput.addEventListener('input', () => incomePeriodOutput.value = this.calcSavedMoney());
    targetMonthOutput.value = this.getTargetMonth();
  },
  asking: function () {
    this.deposit = confirm('Нажмите "OK", если у Вас есть депозит в банке');
  },
  getExpensesMonth: function () {
    for (let expense in this.expenses) {
      this.expensesMonth += this.expenses[expense];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return ('У Вас высокий уровень дохода!');
    } else if (this.budgetDay >= 600) {
      return ('У Вас средний уровень дохода.');
    } else if (this.budgetDay >= 0) {
      return ('К сожалению, у Вас уровень дохода ниже среднего :(');
    } else {
      return ('Что-то пошло не так О_о');
    }
  },
  getDepositInfo: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = +prompt('Какой годовой процент?', '3.3');
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodInput.value;
  },
  watchPeriodInput: function () {
    periodAmount.textContent = periodInput.value;
  }
}
calculateBtn.disabled = true;
budgetInput.addEventListener('input', () => calculateBtn.disabled = budgetInput.value === '');
titleInputs.forEach(item => {
  item.addEventListener('input', () => item.value = item.value.replace(/[^а-яё, ]/gi, ''));
});
amountInputs.forEach(item => {
  item.addEventListener('keydown', evt => {
    if (evt.key < '0' || evt.key > '9') evt.preventDefault();
  });
});

calculateBtn.addEventListener('click', appData.start.bind(appData));
resetBtn.addEventListener('click', appData.reset.bind(appData));
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);
expenseAddBtn.addEventListener('click', appData.addExpensesBlock);
periodInput.addEventListener('input', appData.watchPeriodInput);

// console.log(appData.targetMonth > 0 ? 'Цель будет достигнута за: ' + appData.targetMonth + ' мес.' : 'Цель не будет достигнута');



