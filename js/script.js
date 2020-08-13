'use strict';

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessTheNumber(min, max) {
    let numberOfAttempts = 10,
      conceivedNumber = getRandomInt(min, max);

    // dev
    console.log('Загаданное число: ', conceivedNumber);

    return function getAttempt() {
        if (numberOfAttempts < 1) {
            if (confirm('Попытки закончились, хочешь сыграть еще?')) {
                numberOfAttempts = 10;
                conceivedNumber = getRandomInt(min, max);

                // dev
                console.log('Загаданное число: ', conceivedNumber);
            } else {
                alert('Спасибо за участие!');
                return true;
            }
        }

        const attempt = prompt('Угадай число от 1 до 100:');

        if (+attempt !== conceivedNumber) {
            if (attempt === null) {
                alert('Спасибо за участие!');
                return true;
            } else if (!isNumber(attempt)) {
                alert('Введи число!');
            } else if (attempt > conceivedNumber) {
                numberOfAttempts--;
                alert('Загаданное число меньше! Осталось ' + numberOfAttempts + ' попыток');
            } else if (attempt < conceivedNumber) {
                numberOfAttempts--;
                alert('Загаданное число больше! Осталось ' + numberOfAttempts + ' попыток');
            }

            getAttempt();
        } else {
            if (confirm('Поздравляю, ты угадал! Хочешь сыграть еще?')) {
                numberOfAttempts = 10;
                conceivedNumber = getRandomInt(min, max);

                // dev
                console.log('Загаданное число: ', conceivedNumber);

                getAttempt();
            } else {
                alert('Спасибо за участие!');
                return true;
            }
        }
    }
}

const bot = guessTheNumber(1, 100);
bot();
console.dir(bot);
