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
    const conceivedNumber = getRandomInt(min, max);
    let numberOfAttempts = 10;

    // dev
    console.log('Загаданное число: ', conceivedNumber);

    return function getAttempt() {
        const attempt = prompt('Угадай число от 1 до 100:');

        if (+attempt !== conceivedNumber) {
            numberOfAttempts--;
            if (attempt === null) {
                alert('Спасибо за участие!');
                return true;
            } else if (!isNumber(attempt)) {
                alert('Введи число! Осталось ' + numberOfAttempts + ' попыток');
            } else if (attempt > conceivedNumber) {
                alert('Загаданное число меньше! Осталось ' + numberOfAttempts + ' попыток');
            } else if (attempt < conceivedNumber) {
                alert('Загаданное число больше! Осталось ' + numberOfAttempts + ' попыток');
            }

            getAttempt();
        } else {
            alert('Ура! Ты победил!');
        }
    }
}

const bot = guessTheNumber(1, 100);
bot();
console.dir(bot);
