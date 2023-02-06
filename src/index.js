const columns = ['name', 'count', 'price'];
const data = [
    {name: 'Хлеб', count: 12, price: 14.99},
    {name: 'Молоко', count: 3, price: 3.2},
    {name: 'Сыр', count: 1, price: 10},
    {name: 'Вода', count: 2, price: 5.5},
];

function createTextTable(columns, data) {
    if ((!columns || (columns && !columns.length)) || 
      (!data || (data && !data.length))) return null;

    function getMaxCellLength() { // поиск максимального элемента(его длины) в каждой колонке
        const maxCellLengthByData = {};

        columns.forEach(columnName => {
            const rowWithMaxValueLengthByColumnName = data.reduce((max, current) => {
                return max[columnName] && current[columnName] ?
                    (max[columnName].toString().length > current[columnName].toString().length ? max : current) :
                    {};
            });

            if (rowWithMaxValueLengthByColumnName[columnName]) {
                maxCellLengthByData[columnName] = rowWithMaxValueLengthByColumnName[columnName].toString().length;
            }
        });

        return maxCellLengthByData; // максимальное значение символов по колонкам
    }

    function addSpaces(cellData, numOfSpace, isAddToRight) { // заполнение пробелами слева, справа
        if (isAddToRight) return " " + cellData + " ".repeat(numOfSpace);
        
        return " ".repeat(numOfSpace) + cellData + " ";
    }

    function getCommonSeparator(maxLengthValuesByColumns) { //рисование горизонтальной линии
        const clmnLength = maxLengthValuesByColumns.length;
        const cellSeparatorNums = clmnLength + 1; //кол-во разделений между колонками
        const additionalSpacesNumForCells = clmnLength * 2; //кол-во пробелов во всех колонках
        const maxDataRowLength = maxLengthValuesByColumns.reduce((v, r) => r + v, 0); //макс длина, занимающая элементами в колонках
        const separatorLength = cellSeparatorNums + additionalSpacesNumForCells + maxDataRowLength; //длина вся, вкл длину эл+пробелы+линии

        return '\u2500'.repeat(separatorLength).split(''); 
    }

    function addRowSeparator(commonSeparator, maxColumnLengthByValues, separatorType) {
        const separator = commonSeparator;
        const separatorLength = commonSeparator.length;
        
        switch(separatorType) {
            case 'top':
                separator[0] = '\u250c';  //start symbol
                separator[separatorLength - 1] = '\u2510'; // end symbol
                break;
            case 'middle':
                separator[0] = '\u251c';
                separator[separatorLength - 1] = '\u2524';
                break;
            case 'bottom':
                separator[0] = '\u2514';
                separator[separatorLength - 1] = '\u2518';
                break;
        }

        let start = 0;

        for (let i = 0; i < columns.length - 1; i++) {
            switch(separatorType) {
                case 'top':
                    separator[start + maxColumnLengthByValues[i] + 3] = '\u252c'; //форм-е эл-тов табл по вертикали
                    break;
                case 'middle':
                    separator[start + maxColumnLengthByValues[i] + 3] = '\u253c';
                    break;
                case 'bottom':
                    separator[start + maxColumnLengthByValues[i] + 3] = '\u2534';
                    break;
            }

            start += maxColumnLengthByValues[i] + 3;
        }

        return separator.join('');
    }

    function addCellSeparator(cellData, indx) {
        return (indx === 0 ? "\u2502" : "") + cellData + "\u2502";
    }

    const maxCellLengthByData = getMaxCellLength(data);
    const maxLengthValues = Object.values(maxCellLengthByData);
    const dataExistsColumns = Object.keys(maxCellLengthByData);
    const commonSeparator = getCommonSeparator(maxLengthValues);
    const table = [];
    let row = "";

    data.forEach((rowData, rowIndx) => {
        if (rowIndx === 0) {
            table.push(addRowSeparator(commonSeparator, maxLengthValues, 'top'));
        }

        dataExistsColumns.forEach((columnName, columnIndx) => {
            let cellData = rowData[columnName];

            if (cellData) {
                cellData = addSpaces(
                    cellData,
                    (maxCellLengthByData[columnName] - cellData.toString().length + 1),
                    (typeof cellData === 'string')
                );
            }
            else {
                cellData = addSpaces("", (maxCellLengthByData[columnName] + 1));
            }

            cellData = addCellSeparator(cellData, columnIndx);

            row += cellData;
        });

        table.push(row);

        if (rowIndx !== data.length - 1) {
            table.push(addRowSeparator(commonSeparator, maxLengthValues, 'middle'));
        }
        else if (rowIndx === data.length - 1) {
            table.push(addRowSeparator(commonSeparator, maxLengthValues, 'bottom'));
        }

        row = "";
    });

    return table.join("\n");
}

console.log(createTextTable(columns, data));
