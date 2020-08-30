'use strict';

const dataInputBlock = document.querySelector('.data'),
  calculateBtn = document.getElementById('start'),
  resetBtn = document.getElementById('cancel'),
  incomeAddBtn = document.getElementsByTagName('button')[0],
  expenseAddBtn = document.getElementsByTagName('button')[1],
  incomeItems = document.getElementsByClassName('income-items'),
  expensesItems = document.getElementsByClassName('expenses-items'),
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
  depositCheck = document.getElementById('deposit-check'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodInput = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  titleInputs = document.querySelectorAll('[placeholder="Наименование"]'),
  amountInputs = document.querySelectorAll('[placeholder="Сумма"]');

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

const arrayCapitalizeString = array => array.map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join(', ');

const getCookie = name => {
  const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (key, value, options = {}) => {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  let cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    cookie += '; ' + optionKey;
    if (options[optionKey] !== true) {
      cookie += '=' + options[optionKey];
    }
  }

  document.cookie = cookie;
}

const deleteCookie = name => {
  setCookie(name, '', {'max-age': -1});
};

class AppData {
  constructor() {
    this.setDefaultValues();
  }

  start() {
    this.budget = +budgetInput.value;

    this.getIncomeExpenses();
    this.getExpensesMonth();
    this.getDepositInfo();
    this.getBudget();
    this.getAddIncomeExpenses();
    this.showResult();

    this.blockInterface();

    this.saveData();
  }

  reset() {
    this.deleteData();

    this.setDefaultValues();

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
    depositBank.disabled = false;
    depositBank.style.display = '';
    depositBank.value = '';
    depositAmount.style.display = '';
    depositPercent.style.display = '';

    document.querySelectorAll('.result-total')
      .forEach(item => item.value = '');
    calculateBtn.style.display = '';
    calculateBtn.disabled = true;
    resetBtn.style.display = '';
  }

  setDefaultValues() {
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
    this.mission = 0;
    this.depositAmount = 0;
    this.depositPercent = 0;
  }

  blockInterface() {
    dataInputBlock.querySelectorAll('input[type="text"]')
      .forEach(item => item.disabled = true);

    incomeAddBtn.disabled = true;
    expenseAddBtn.disabled = true;
    depositCheck.disabled = true;
    depositBank.disabled = true;

    calculateBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
  }

  addIncomeExpensesBlock(evt, items) {
    const type = evt.target.classList[1].split('_')[0],
      cloneItem = items[0].cloneNode(true);

    cloneItem.querySelector(`.${type}-title`).value = '';
    cloneItem.querySelector(`.${type}-amount`).value = '';
    cloneItem.querySelector(`.${type}-title`).addEventListener('input', evt => evt.target.value = evt.target.value.replace(/[^а-яё, ]/gi, ''));
    cloneItem.querySelector(`.${type}-amount`).addEventListener('input', evt => evt.target.value = evt.target.value.replace(/[^0-9.]/, ''));

    evt.target.before(cloneItem);
    if (items.length >= 3) evt.target.style.display = 'none';
  }

  getIncomeExpenses() {
    const count = item => {
      const type = item.className.split('-')[0],
        itemTitle = item.querySelector(`.${type}-title`).value.trim(),
        itemAmount = item.querySelector(`.${type}-amount`).value;

      if (itemTitle !== '' && itemAmount !== '') {
        this[type][itemTitle.toLowerCase()] = +itemAmount;
      }
    };

    [...incomeItems].forEach(count);
    for (let income in this.income) {
      this.incomeMonth += this.income[income];
    }

    [...expensesItems].forEach(count);
  }

  getAddIncomeExpenses() {
    const collect = (item, isIncome = false) => {
      item = item.trim().toLowerCase();
      if (item !== '') {
        isIncome ?  this.addIncome.push(item) :  this.addExpenses.push(item);
      }
    }

    addIncomeInput.forEach(item => collect(item.value, true))
    addExpensesInput.value.split(', ').forEach(item => collect(item));
  }

  showResult() {
    budgetMonthInput.value = this.budgetMonth;
    budgetDayInput.value = this.budgetDay;
    expensesMonthOutput.value = this.expensesMonth;
    addIncomeOutput.value = arrayCapitalizeString(this.addIncome);
    addExpensesOutput.value = arrayCapitalizeString(this.addExpenses);
    incomePeriodOutput.value = this.calcSavedMoney();
    periodInput.addEventListener('input', () => {
      incomePeriodOutput.value = this.calcSavedMoney();
      localStorage.setItem('incomePeriod', incomePeriodOutput.value);
    });
    targetMonthOutput.value = this.getTargetMonth();
  }

  getExpensesMonth() {
    for (let expense in this.expenses) this.expensesMonth += this.expenses[expense];
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    if (this.deposit) this.budgetMonth += this.depositAmount * this.depositPercent / 100;

    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ('У Вас высокий уровень дохода!');
    } else if (this.budgetDay >= 600) {
      return ('У Вас средний уровень дохода.');
    } else if (this.budgetDay >= 0) {
      return ('К сожалению, у Вас уровень дохода ниже среднего :(');
    } else {
      return ('Что-то пошло не так О_о');
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * periodInput.value;
  }

  watchPeriodInput() {
    periodAmount.textContent = periodInput.value;
  }

  getDepositInfo() {
    if (this.deposit) {
      this.depositAmount = +depositAmount.value;
      this.depositPercent = +depositPercent.value;
    }
  }

  changePercent() {
    const selectValue = this.value;
    if (selectValue === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
      depositPercent.addEventListener('change', () => {
        const percent = depositPercent.value;
        if (!isNumber(percent) || !(percent >= 0 && percent <= 100)) {
          alert('Введите корректное значение в поле "Процент"!');
          calculateBtn.disabled = true;
        } else if (budgetInput.value) calculateBtn.disabled = false;
      });
    } else {
      depositPercent.value = selectValue;
      depositPercent.style.display = '';
    }
  }

  depositHandler() {
     if (depositCheck.checked) {
       depositBank.style.display = 'inline-block';
       depositAmount.style.display = 'inline-block';
       this.deposit = true;
       depositBank.addEventListener('change', this.changePercent);
     } else {
       depositBank.style.display = '';
       depositAmount.style.display = '';
       depositBank.value = '';
       depositAmount.value = '';
       this.deposit = false;
       depositBank.removeEventListener('change', this.changePercent);
     }
  }

  addEventListeners() {
    calculateBtn.disabled = true;
    budgetInput.addEventListener('input', () => calculateBtn.disabled = budgetInput.value === '');
    titleInputs.forEach(item => {
      item.addEventListener('input', () => item.value = item.value.replace(/[^а-яё, ]/gi, ''));
    });
    amountInputs.forEach(item => {
      item.addEventListener('input', () => item.value = item.value.replace(/[^0-9.]/, ''));
    });

    calculateBtn.addEventListener('click', this.start.bind(this));
    resetBtn.addEventListener('click', this.reset.bind(this));
    incomeAddBtn.addEventListener('click', evt => this.addIncomeExpensesBlock(evt, incomeItems));
    expenseAddBtn.addEventListener('click', evt => this.addIncomeExpensesBlock(evt, expensesItems));
    periodInput.addEventListener('input', this.watchPeriodInput);
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }

  saveData() {
    localStorage.setItem('isLoad', String(true));
    localStorage.setItem('budgetMonth', budgetMonthInput.value);
    localStorage.setItem('budgetDay', budgetDayInput.value);
    localStorage.setItem('expensesMonth', expensesMonthOutput.value);
    localStorage.setItem('addIncome', addIncomeOutput.value);
    localStorage.setItem('addExpenses', addExpensesOutput.value);
    localStorage.setItem('incomePeriod', incomePeriodOutput.value);
    localStorage.setItem('targetMonth', targetMonthOutput.value);
    localStorage.setItem('periodInput', periodInput.value);

    setCookie('isLoad', true,{'max-age': 2592e6});
    setCookie('budgetMonth', budgetMonthInput.value,{'max-age': 2592e6});
    setCookie('budgetDay', budgetDayInput.value,{'max-age': 2592e6});
    setCookie('expensesMonth', expensesMonthOutput.value,{'max-age': 2592e6});
    setCookie('addIncome', addIncomeOutput.value,{'max-age': 2592e6});
    setCookie('addExpenses', addExpensesOutput.value,{'max-age': 2592e6});
    setCookie('incomePeriod', incomePeriodOutput.value,{'max-age': 2592e6});
    setCookie('targetMonth', targetMonthOutput.value,{'max-age': 2592e6});
    setCookie('periodInput', periodInput.value,{'max-age': 2592e6});
  }

  compareData() {
    const cookieArray = document.cookie.split('; ');
    const comparisonResult1 = cookieArray.every(item => localStorage.getItem(item.substring(0, item.indexOf('='))) === getCookie(item.substring(0, item.indexOf('='))));

    const localStorageKeys = Object.keys(localStorage);
    const comparisonResult2 = localStorageKeys.every(item => localStorage.getItem(item) === getCookie(item));

    if (!comparisonResult1 || !comparisonResult2) this.deleteData();
  }

  getData() {
    budgetMonthInput.value = localStorage.getItem('budgetMonth');
    budgetDayInput.value = localStorage.getItem('budgetDay');
    expensesMonthOutput.value = localStorage.getItem('expensesMonth');
    addIncomeOutput.value = localStorage.getItem('addIncome');
    addExpensesOutput.value = localStorage.getItem('addExpenses');
    incomePeriodOutput.value = localStorage.getItem('incomePeriod');
    periodInput.addEventListener('input', () => {
      incomePeriodOutput.value = budgetMonthInput.value * periodInput.value;
      localStorage.setItem('incomePeriod', incomePeriodOutput.value);
      setCookie('incomePeriod', incomePeriodOutput.value,{'max-age': 2592e6});

      localStorage.setItem('periodInput', periodInput.value);
      setCookie('periodInput', periodInput.value,{'max-age': 2592e6});
    });
    targetMonthOutput.value = localStorage.getItem('targetMonth');

    periodInput.value = localStorage.getItem('periodInput');
    periodAmount.textContent = periodInput.value;

    this.blockInterface();
  }

  deleteData() {
    localStorage.clear();

    const cookieArray = document.cookie.split('; ');
    cookieArray.forEach(item => deleteCookie(item.substring(0, item.indexOf('='))));
  }
}

const appData = new AppData();

appData.compareData();
if (localStorage.getItem('isLoad')) appData.getData();

appData.addEventListeners();

// console.log(appData.targetMonth > 0 ? 'Цель будет достигнута за: ' + appData.targetMonth + ' мес.' : 'Цель не будет достигнута');
