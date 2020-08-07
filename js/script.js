let num = 266219,
    multiply = 1;

while (num > 0) {
    multiply *= num % 10;
    num = Math.trunc(num / 10);
}

console.log(multiply);

let newNum = multiply ** 3;

console.log(String(newNum).slice(0, 2));