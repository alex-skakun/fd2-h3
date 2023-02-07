const columns = ['name', 'count', 'price'];
const data = [
    { name: 'Хлеб', count: 12, price: 14.99 },
    { name: 'Молоко', count: 3, price: 3.2 },
    { name: 'Сыр', count: 1, price: 10 },
    { name: 'Вода', count: 2, price: 5.5 },
];

const textTable = createTextTable(columns, data);

console.log(textTable);

function createLine(typeLine, lengthColumns, lengthHor) {
    let line = "";
    let counterColumns = 0;

    let leftSymbol, rightSymbol, centerSymbol; let mainSymbol = "─";

    switch (typeLine) {
        case 'center':
            leftSymbol = "├"; rightSymbol = "┤"; centerSymbol = "┼";
            break;
        case 'top':
            leftSymbol = "┌"; rightSymbol = "┐"; centerSymbol = "┬";
            break;
        case 'bottom':
            leftSymbol = "└"; rightSymbol = "┘"; centerSymbol = "┴";
            break;
        default:
    }

    line += leftSymbol;
    for (let i = 0; i <= lengthHor - 2; i++) {
        if (i != lengthColumns[counterColumns]) {
            line += mainSymbol;
        } else {
            line += centerSymbol;
            counterColumns++;
        }
    }
    line += rightSymbol + "\n";
    return line;
}

function createTextTable(columns, data) {
    let resultLine = '';
    let lenHor = columns.length;
    data = addSpaces(columns, data);
    let lenColumns = [];

    for (let el in data[0]) {
        lenColumns.push(data[0][el].length);
        lenHor += data[0][el].length;
    }

    for (let i = 1; i < lenColumns.length; i++) {
        lenColumns[i] += lenColumns[i - 1] + 1;
    }

    let arr = [];
    for (let el of data) {
        let buf = [];
        for (let col of columns) {
            buf.push(el[col]);
        }
        arr.push(buf);
    }

    let counter = 0;
    for (let el of arr) {
        resultLine += '|' + el.join('|') + '|\n';
        if (counter != arr.length-1) {
            resultLine += createLine('center', lenColumns, lenHor);
        }
        counter++;
    }

    resultLine = createLine('top', lenColumns, lenHor) + resultLine + createLine('bottom', lenColumns, lenHor);

    return resultLine;

}

function addSpaces(columns, data) {
    for (let i = 0; i < columns.length; i++) {
        let maxlength = findMaxlength(columns, data, i);

        for (let j = 0; j < data.length; j++) {
            while (String(data[j][columns[i]]).length < maxlength) {
                if (isNaN(String(data[j][columns[i]]).trim())) {
                    data[j][columns[i]] += ' ';
                } else {
                    data[j][columns[i]] = ' ' + data[j][columns[i]];
                }

            }
            data[j][columns[i]] = ' ' + data[j][columns[i]] + ' ';
        }
    }
    return data;
}

function findMaxlength(columns, data, num) {
    let maxlength = 0;
    let buf;
    for (let el of data) {

        buf = String(el[columns[num]]).length;

        if (maxlength < buf) {
            maxlength = buf;
        }
    }
    return maxlength;
}
