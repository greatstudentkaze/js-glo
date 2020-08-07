const num = 266219,
    numDigits = String(num).split('').map(item => Number(item)),
    product = numDigits.reduce((total, digit) => total * digit),
    result = String(product ** 3).slice(0, 2);

console.log(product);

console.log(result);