'use strict'

const columns = ['name', 'count', 'price'];
const data = [
    {name: 'Хлеб', count: 12, price: 14.99},
    {name: 'Молоко', count: 3, price: 3.2},
    {name: 'Сыр', count: 1, price: 10},
    {name: 'Вода', count: 2, price: 5.5},
];

console.log(createTextTable(columns, data));

function createTextTable (columns, data) {
    allSpaces();
    let Table = '';
    Table = `${createUpperLimit()}` + '\n';

    for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
            Table += `${createLineWithContent(data[i])}` + '\n';
            Table += `${createBottomLimit()}` + '\n';
        } else {
            Table += `${createLineWithContent(data[i])}` + '\n';
            Table += `${separatorCreator()}` + '\n';
        }
    }

    return Table;
}





function getMaxLength (k) {
    let maxLength;

    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            maxLength = String(data[i][k]).length;
        } else {
            maxLength = Math.max(maxLength, String(data[i][k]).length);
        }
    }

    return maxLength;
};

function spaces (k) {
    data.forEach(function (object) {
        if (isFinite(object[k])) {
            object[k] = String(object[k]);

            let diff = getMaxLength(k) - object[k].length;

            for(let i = 0; i < diff; i++) {
                object[k] = ' ' + object[k];
            }
        } else {
            let diff = getMaxLength(k) - object[k].length;
            for (let i = 0; i < diff; i++) {
                object[k] += ' ';
            }
        }

        return object;
    });
};

function getLineLength () {
    let lineLength = 0;

    for(let i = 0; i < columns.length; i++) {
        lineLength += getMaxLength(columns[i]);
    }

    return lineLength;
}

let lineLength = getLineLength();

function allSpaces () {
    for (let column of columns) {
        spaces(column);
    }
}

function getAllMaxLegths () {
    let allMaxLegths = [];

    for(let column of columns) {
        allMaxLegths.push(getMaxLength(column));
    }
    return allMaxLegths;
}

function createUpperLimit () {
    let upperLimit = '\u250C\u2500';

    for (let i = 0; i < getAllMaxLegths().length; i++) {
        for (let p = 0; p < getAllMaxLegths()[i]; p++) {
            upperLimit = upperLimit + '\u2500'
        }
        upperLimit = i === getAllMaxLegths().length - 1 ?
            upperLimit + '\u2500\u2510' : upperLimit + '\u2500\u252C\u2500';
    }
    return upperLimit
}

function createBottomLimit () {
    let bottomLimit = '\u2514\u2500';
  for (let i = 0; i < getAllMaxLegths().length; i++) {
    for (let p = 0; p < getAllMaxLegths()[i]; p++) {
      bottomLimit = bottomLimit + '\u2500'
    }
    bottomLimit = i === getAllMaxLegths().length - 1 ?
      bottomLimit + '\u2500\u2518' : bottomLimit + '\u2500\u2534\u2500';
  }
  return bottomLimit;
}

function createLineWithContent (object) {
    let lineWithContent = '\u2502 ';

    for (let column of columns) {
        lineWithContent = lineWithContent + object[column] + ' \u2502 ' 
    }

    return lineWithContent;
}

function separatorCreator () {
    let separator = '\u251C\u2500';

    for (let i = 0; i < getAllMaxLegths().length; i++) {
        for (let p = 0; p < getAllMaxLegths()[i]; p++) {
          separator = separator + '\u2500'
        }
        separator = i === getAllMaxLegths().length - 1 ?
          separator + '\u2500\u2524' : separator + '\u2500\u253C\u2500';
      }
      return separator;
}
