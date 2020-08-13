const processString = function (str) {
    if (typeof str !== "string") {
        console.log('В качестве аргумента функции передана не строка!');
        return;
    } else if (/^\d+$/.test(str)) {
        console.log('В переданной строке только цифры!');
        return;
    }


    str = str.trim();

    if (str.length > 30) {
        str = str.substr(0, 30);
        str += '...';
    }

    return str;
};

console.log(processString('     9tyeight    '));

console.log('\n');

console.log(processString(98));

console.log('\n');

console.log(processString('98'));

console.log('\n');

console.log(processString('Если строка более 30 знаков - то после 30го символа часть текста скрывается и вместо них появляются три точки (...)'));
