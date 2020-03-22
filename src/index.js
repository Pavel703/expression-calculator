
























function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '');
    expr = expr.split('');
    let exprArray = [];
    let element = '';

    for (let i = 0; i < expr.length; i++) {
        if (expr[i].match(/[0-9]/)) {
            element = element + expr[i];
            if (i === expr.length - 1) {
                exprArray.push(parseInt(element))
                element = [];
            } else {
                continue;
            }
        }
        if (element.length > 0) {
            exprArray.push(parseInt(element))
            element = [];
        }
        if (expr[i].match(/\W/)) {
            exprArray.push(expr[i]);
        }
    }


    let openedBrackets = 0;
    let closedBrackets = 0;
    for (let index = 0; index < exprArray.length; index++) {
        if (exprArray[index] === '(') {
            openedBrackets++;
        }
        if (exprArray[index] === ')') {
            closedBrackets++;
            if (closedBrackets > openedBrackets) {
                throw new Error("Error: brackets are odd");
            }
        }
    }
    if (openedBrackets != closedBrackets) {
        throw new Error("Error: brackets are odd");
    }

    function count(array) {
        let result = 0;
        for (let index = 0; index < array.length; index++) {
            if (array[index] === '/') {
                if (+array[index + 1] === +'0') {
                    throw new Error("Error: Division by 0");
                } else {
                    result = +array[index - 1] / +array[index + 1];
                    array.splice(index - 1, 3, result);
                    index = -1;
                }
            }
            if (array[index] === '*') {
                result = +array[index - 1] * +array[index + 1];
                array.splice(index - 1, 3, result);
                index = -1;
            }
        }
        for (let index = 0; index < array.length; index++) {
            if (array[index] === '+') {
                result = +array[index - 1] + +array[index + 1];
                array.splice(index - 1, 3, result);
                index = -1;
            }
            if (array[index] === '-') {
                result = +array[index - 1] - +array[index + 1];
                array.splice(index - 1, 3, result);
                index = -1;
            }
        }
        return array;
    }

    function countBrackets(array) {
        let arrayOper = [];
        let openBracket = 0;
        let elements_count = 0;
        for (let index = 0; index < array.length; index++) {
            if (array[index] === "(") {
                arrayOper = [];
                openBracket = index;
                elements_count = 1;
            } else if (array[index] === ")") {
                break;
            }
            if (array[index] != "(") {
                arrayOper.push(array[index]);
                elements_count++;
            }
        }
        arrayOper = +count(arrayOper);
        array.splice(openBracket, elements_count + 1, arrayOper);
        return array;
    }
 
    while (exprArray.includes('(')) {
        exprArray = countBrackets(exprArray);
    }
    result = count(exprArray);
    return +result
}
module.exports = {
    expressionCalculator
}
