const border = '\u2500', columnsSeparator = '\u2502', topRightCorner = '\u250C',
topLeftCorner =  '\u2510', topMiddleSeparator = '\u252C', middleRightSeparator = '\u251C',
middleLeftSeparator = '\u253C', middleCenterSeparator = '\u2524', bottomRightCorner = '\u2514',
bottomLeftCorner = '\u2518', bottomMiddleSeparator = '\u2534', space = ' ', nextString = '\n',
columns = ['name', 'count', 'price'], 
data = [
  {name: 'Хлеб', count: 12, price: 14.99},
  {name: 'Молоко', count: 3, price: 3.2},
  {name: 'Сыр', count: 1, price: 10},
  {name: 'Вода', count: 2, price: 5.5},
]

function maxLength(j) {
  let maxLengthCount;
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      maxLengthCount = String(data[i][j]).length
    } else {
      maxLengthCount = Math.max(maxLengthCount, String(data[i][j]).length )
    }
  } return maxLengthCount;
} 

function invitedMaxLength() {
  let invMaxLengthes = [];
  for (let column of columns) {
    invMaxLengthes.push(maxLength(column));
  } return invMaxLengthes;
}

function addSpacesEverywhere() {
  for (let column of columns) {
    addSpaces(column);
  }
  function addSpaces(j) {
    data.forEach(function (obj) {
      if (isFinite(obj[j])) {                                     
        obj[j] = String(obj[j]);
        let spacePositon = maxLength(j) - obj[j].length;
        for (let i = 0; i < spacePositon; i++) {
          obj[j] = space + obj[j];
        }
      } else {                                                      
        let spacePositon = maxLength(j) - obj[j].length;
        for (let i = 0; i < spacePositon; i++) {
          obj[j] += space;
        }
      } return obj;
    })
  }
}

function createTableStringOfColumns(obj) {
  let rowLine = columnsSeparator + space;
  for (let column of columns) {
    rowLine = rowLine + obj[column] + space + columnsSeparator + space;
  } return rowLine;
}

function createRows(startSymbol, rowSymbol, middleSeparator, endSymbol) {
  let row = startSymbol + rowSymbol;
  for (let i = 0; i < invitedMaxLength().length; i++) {
    for (let j = 0; j < invitedMaxLength()[i]; j++) {
      row = row + rowSymbol
    }  
    row = i === invitedMaxLength().length - 1 ?
    row + rowSymbol + endSymbol : row + rowSymbol + middleSeparator + rowSymbol;
  } return row;
}

function createTextTable(columns, data) {
  addSpacesEverywhere();
  let textTable;
  textTable = createRows(topRightCorner, border, topMiddleSeparator, topLeftCorner) + nextString;
  for (let i = 0; i < data.length; i++) {
    if (i === data.length - 1) {
      textTable += createTableStringOfColumns(data[i]) + nextString;
      textTable += createRows(bottomRightCorner, border, bottomMiddleSeparator, bottomLeftCorner) + nextString;
    } else {
      textTable += createTableStringOfColumns(data[i]) + nextString;
      textTable += createRows(middleRightSeparator, border, middleCenterSeparator, middleLeftSeparator) + nextString;
    }
  } return textTable;
}

console.log(createTextTable(columns, data));
