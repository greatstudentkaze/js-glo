// 1
const arr = ['543', '3240', '403', '943', '230', '1235', '4004'];

arr.filter(item => item[0] === '4' || item[0] === '2').forEach(item => console.log(item));

console.log('\n');

// 2
const numbers = [];

for (let i = 0; i < 100; i++) {
    numbers[i] = i + 1;
}

console.log('Все простые числа от 1 до 100:');
const primeNumbers = numbers.filter(item => isPrimeNumber(item));
primeNumbers.forEach(item => console.log(`\t${item} (делители: ${1} и ${item})`));

function isPrimeNumber(n) {
    if (n === 1) return false;
    else if (n === 2) return true;

    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }

    return true;
}
