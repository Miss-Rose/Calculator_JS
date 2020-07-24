let display = document.getElementById('input');
let numbers = document.querySelectorAll('.figure');
let operators = document.querySelectorAll('.act');
let result = document.querySelector('.res');
let opposite = document.querySelector('.opposite');
let point = document.querySelector('.point');
let clear = document.querySelector('.clear');
let clear_all = document.querySelector('.clear_all');

let isPoint = false;
let isRes = false;
let isOperator = false;

point.addEventListener("click", () => {
    let lastChar = display.innerHTML[display.innerHTML.length - 1];
    console.log(lastChar);
    console.log('isPoint', isPoint);
    if (isRes === true) {
        return 0;
    }
    if (lastChar === undefined || lastChar === '+' || lastChar === '-' || lastChar ===  '*' || lastChar === '/') {
        display.innerHTML += '0.';
        isPoint = true;
    } else if (isPoint === true) {
        display.innerHTML += '';
    } else {
        display.innerHTML += '.';
        isPoint = true;
    }
    console.log('display', display.innerHTML);

});

numbers.forEach(number => {
    number.addEventListener("click", () => {
        let lastChar = display.innerHTML[display.innerHTML.length - 1];
        if (isRes === false) {
            display.innerHTML += number.innerHTML;
        }

    })
});

operators.forEach(operator => {
    operator.addEventListener("click", () => {

        if (isRes === true) {
            return 0;
        }
        let lastChar = display.innerHTML[display.innerHTML.length-2];
        console.log("lastChar",lastChar);
        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') { // якщо останній - оператор, то переписати оператор
            display.innerHTML = display.innerHTML.split("").slice(0, display.innerHTML.length - 3).join("");
            console.log("display.innerHTML",display.innerHTML);
            display.innerHTML += ' ';
            display.innerHTML += operator.innerHTML;
            display.innerHTML += ' ';
        } else {
            display.innerHTML += ' ';
            display.innerHTML += operator.innerHTML;
            display.innerHTML += ' ';
        }
        isPoint = false;
    })
});

result.addEventListener("click", () => {
    let lastChar = display.innerHTML[display.innerHTML.length - 1];
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        display.innerHTML = display.innerHTML.split("").slice(0, display.innerHTML.length - 1).join("");
        console.log(display.innerHTML);
    } else if (lastChar !== undefined && isRes === false) {
        display.innerHTML += ' = ';
        isRes = true;
        display.innerHTML += evaluate(display.innerHTML);
    }
});

clear.addEventListener("click", () => {
    display.innerHTML = display.innerHTML.split('').splice(0,display.innerHTML.length - 1).join("");
});

clear_all.addEventListener("click", () => {
    display.innerHTML = '';
    isRes = false;
});


const sum = (a, b) => {
    return parseFloat(a) + parseFloat(b);
};
const sub = (a, b) => {
    return parseFloat(a) - parseFloat(b);
};
const div = (a, b) => {
    return parseFloat(a) / parseFloat(b);
};
const mul = (a, b) => {
    return parseFloat(a) * parseFloat(b);
};

const evaluate = (str) => {
    console.log("str",str);
    let exp = str.split(' ');
    console.log("exp",exp);
     for (let i = 0; i < exp.length; i++) {
        let temp = exp;
        if (exp[i] === '*' || exp[i] === '/') {
            let temp = exp;
            let res;
            if (exp[i] === '*') {
                res = mul(+exp[i - 1], +exp[i + 1]);
            }
            if (exp[i] === '/') {
                res = div(+exp[i - 1], +exp[i + 1]);
            }
            exp = exp.slice(0, i - 1);
            exp.push(res.toString());
            exp = exp.concat(temp.slice(i + 2));
            i--;
        }
    }
    for (let i = 0; i < exp.length; i++) {
        let temp = exp;
        if (exp[i] === '+' || exp[i] === '-') {
            let temp = exp;
            let res;
            if (exp[i] === '+') {
                res = sum(+exp[i - 1], +exp[i + 1]);
            }
            if (exp[i] === '-') {
                res = sub(+exp[i - 1], +exp[i + 1]);
            }
            exp = exp.slice(0, i - 1);
            exp.push(res.toString());
            exp = exp.concat(temp.slice(i + 2));
            i--;
        }
    }
    console.log(exp);
    return exp[0];
};


