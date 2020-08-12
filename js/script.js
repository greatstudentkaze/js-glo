// 1
const arr = ['543', '3240', '403', '943', '230', '1235', '4004'];

arr.forEach(item => {
    if (item[0] === '4' || item[0] === '2') console.log(item);
});

console.log('\n');

// 2
console.log('Все простые числа от 1 до 100:');
for (let i = 1; i < 101; i++) {
    if (isPrimeNumber(i)) console.log(`${i} (делители: ${1} и ${i})`)
}

function isPrimeNumber(n) {
    if (n === 1) return false;
    else if (n === 2) return true;

    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }

    return true;
}
