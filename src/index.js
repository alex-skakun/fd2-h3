const columns = ['name', 'count', 'price', 'a'];
const data = [
    {name: 'Хлеб', count: 12, price: 14.99, a: 1},
    {name: 'Молоко', count: 3, price: 3.2, a: 2},
    {name: 'Сыр', count: 1, price: 10, a: 5.5},
    {name: 'Вода', count: 2, price: 5.5, a: 111},
];

function createTextTable(columns, data) {
    if ((!columns || (columns && !columns.length)) || 
      (!data || (data && !data.length))) return null;

    function getMaxCellLength() {
        const maxCellLengthByData = {};

        data.forEach(rowData => {
            columns.forEach(columnKey => {
                if (rowData[columnKey]) {
                    const rowDataLength = rowData[columnKey].toString().length;
        
                    if (!maxCellLengthByData[columnKey] || rowDataLength > maxCellLengthByData[columnKey]) {
                        maxCellLengthByData[columnKey] = rowDataLength;
                    }
                }
            });
        });

        return maxCellLengthByData;
    }

    function addCellExtraSpaces(cellData, numOfSpace, isAddToRight) {
        if (isAddToRight) cellData = " " + cellData + " ".repeat(numOfSpace);
        else cellData = " ".repeat(numOfSpace) + cellData + " ";

        return cellData;
    }

    function getCommonSeparator() {
        const clmnLength = columns.length;
        const cellSeparatorNums = clmnLength + 1;
        const additionalSpacesNumForCells = clmnLength * 2;
        const maxDataRowLength = Object.values(maxCellLengthByData).reduce((v, r) => r + v, 0);
        const separatorLength = cellSeparatorNums + additionalSpacesNumForCells + maxDataRowLength;

        return '\u2500'.repeat(separatorLength).split('');
    }

    function addRowSeparator(separatorType) {
        const separator = commonSeparator;
        const separatorLength = commonSeparator.length;
        
        switch(separatorType) {
            case 'top':
                separator[0] = '\u250c';
                separator[separatorLength - 1] = '\u2510';
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
                    separator[start + maxLengthValues[i] + 3] = '\u252c';
                    break;
                case 'middle':
                    separator[start + maxLengthValues[i] + 3] = '\u253c';
                    break;
                case 'bottom':
                    separator[start + maxLengthValues[i] + 3] = '\u2534';
                    break;
            }
            
            start += maxLengthValues[i] + 3;
        }

        return separator.join('');
    }

    function addCellSeparator(cellData, indx) {
        return (indx === 0 ? "\u2502" : "") + cellData + "\u2502";
    }

    const maxCellLengthByData = getMaxCellLength(data);
    const maxLengthValues = Object.values(maxCellLengthByData);
    const commonSeparator = getCommonSeparator();
    const table = [];
    let row = "";

    data.forEach((rowData, rowIndx) => {
        if (rowIndx === 0) {
            table.push(addRowSeparator('top'));
        }

        columns.forEach((columnName, columnIndx) => {
            let cellData = rowData[columnName];

            if (cellData) {
                cellData = addCellExtraSpaces(
                    cellData, 
                    (maxCellLengthByData[columnName] - cellData.toString().length + 1), 
                    (typeof cellData === 'string')
                );
            }
            else {
                cellData = addCellExtraSpaces("", (maxCellLengthByData[columnName] + 1));
            }

            cellData = addCellSeparator(cellData, columnIndx);
            
            row += cellData;
        });

        table.push(row);

        if (rowIndx !== data.length - 1) {
            table.push(addRowSeparator('middle'));
        }
        else if (rowIndx === data.length - 1) {
            table.push(addRowSeparator('bottom'));
        }

        row = "";
    });

    return table.join("\n");
}

console.log(createTextTable(columns, data));
