'use strict'

const columns = ['anotherName', 'count', 'price', 'oneMoreColumn'];
const data = [
  { anotherName: 'Хлеб', count: 12, price: 14.99, oneMoreColumn: 'текст слева' },
  { anotherName: 'Молоко', count: 3, price: 3.2, oneMoreColumn: 1 },
  { anotherName: 'Сыр чеддер', count: 1, price: 10, oneMoreColumn: 12 },
  { anotherName: 'Вода', count: 2, price: 5.5, oneMoreColumn: 123 },
  { anotherName: 'Проверка', count: 0, price: 99999999, oneMoreColumn: 'а цифры справа' },
];

console.log(createTextTable(columns, data));


//                                                                     Сама функция


function createTextTable(columns, data) {
  insertAllSpaces();
  let textTable = '';
  textTable = `${createUpperBorder()}` + '\n';
  for (let i = 0; i < data.length; i++) {
    if (i === data.length - 1) {
      textTable += `${createContentLine(data[i])}` + '\n';
      textTable += `${createBottomBorder()}` + '\n';
    } else {
      textTable += `${createContentLine(data[i])}` + '\n';
      textTable += `${createSeparator()}` + '\n';
    }
  }
  return textTable;
}







//                                                             Все вспомогательные функции


// Получение макисмальной длины в колонке по ключу (названию колонки)
function getMaxLength(key) {
  let maxLength;
  for (let item = 0; item < data.length; item++) {
    if (item === 0) {
      maxLength = String(data[item][key]).length
    } else {
      maxLength = Math.max(maxLength, String(data[item][key]).length);
    }
  }
  return maxLength;
};


// Функция, расставляющая все недостающие пробелы по ключу (названию колонки)
function insertSpaces(key) {
  data.forEach(function (obj) {
    if (isFinite(obj[key])) {                                     // Для числовых значений 
      obj[key] = String(obj[key]);
      let difference = getMaxLength(key) - obj[key].length;
      for (let i = 0; i < difference; i++) {
        obj[key] = ' ' + obj[key];
      }
    } else {                                                      // Для строчных значений
      let difference = getMaxLength(key) - obj[key].length;
      for (let i = 0; i < difference; i++) {
        obj[key] += ' ';
      }
    }
    return obj;
  });
};


// Функция для получения длины строки (включая отступы у значений)
function getLineLength() {
  let lineLength = 0;
  for (let i = 0; i < columns.length; i++) {
    lineLength += getMaxLength(columns[i])
  }
  return lineLength;
}
let lineLength = getLineLength();


// Расставляем пробелы во всех колонках
function insertAllSpaces() {
  for (let column of columns) {
    insertSpaces(column);
  }
}



// Получить массиов со всеми максимальными длинами
function getAllMaxLengthes() {
  let allMaxLengthes = [];
  for (let column of columns) {
    allMaxLengthes.push(getMaxLength(column));
  }
  return allMaxLengthes;
}


// Создать верхнюю границу
function createUpperBorder() {
  let upperBorder = '\u250C\u2500';
  for (let i = 0; i < getAllMaxLengthes().length; i++) {
    for (let q = 0; q < getAllMaxLengthes()[i]; q++) {
      upperBorder = upperBorder + '\u2500'
    }
    upperBorder = i === getAllMaxLengthes().length - 1 ?
      upperBorder + '\u2500\u2510' : upperBorder + '\u2500\u252C\u2500';
  }
  return upperBorder;
}


// Создать нижнюю границу
function createBottomBorder() {
  let bottomBorder = '\u2514\u2500';
  for (let i = 0; i < getAllMaxLengthes().length; i++) {
    for (let q = 0; q < getAllMaxLengthes()[i]; q++) {
      bottomBorder = bottomBorder + '\u2500'
    }
    bottomBorder = i === getAllMaxLengthes().length - 1 ?
      bottomBorder + '\u2500\u2518' : bottomBorder + '\u2500\u2534\u2500';
  }
  return bottomBorder;
}


// Создать линию с "контентом"
function createContentLine(obj) {
  let contentLine = '\u2502 ';
  for (let column of columns) {
    contentLine = contentLine + obj[column] + ' \u2502 '
  }
  return contentLine;
}


// Создать "разделитель"
function createSeparator() {
  let separator = '\u251C\u2500';
  for (let i = 0; i < getAllMaxLengthes().length; i++) {
    for (let q = 0; q < getAllMaxLengthes()[i]; q++) {
      separator = separator + '\u2500'
    }
    separator = i === getAllMaxLengthes().length - 1 ?
      separator + '\u2500\u2524' : separator + '\u2500\u253C\u2500';
  }
  return separator;
}