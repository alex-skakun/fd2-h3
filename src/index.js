const columns = ["name", "count", "price"];
const data = [
    { name: "Хлеб", count: 12, price: 14.99 },
    { name: "Молоко", count: 3, price: 3.2 },
    { name: "Сыр", count: 1, price: 10 },
    { name: "Вода", count: 2, price: 5.5 },
];

// object with data draw
const boxDraw = {
    lTopCorn: "┌",
    rTopCorn: "┐",
    lBotCorn: "└",
    rBotCorn: "┘",
    tTop: "┬",
    tBot: "┴",
    tLeft: "├",
    tRight: "┤",
    xCenter: "┼",
    vert: "│",
    hor: "─",
};

// get table size
// { name: 6, count: 2, price: 5 }
function tableSize(tableData) {
    let tableSize = {};
    tableData.forEach((val) => {
        for (let a in val) {
            if (
                tableSize[a] === undefined ||
                tableSize[a] < val[a].toString().length
            ) {
                tableSize[a] = val[a].toString().length;
            }
        }
    });
    return tableSize;
}

// create and add separate to string
function createString(str, needLen) {
    let res = "";
    if (str !== undefined && typeof str === "string") {
        res = str + "";
        for (let i = str.toString().length; i < needLen; i++) {
            res += " ";
        }
    } else if (str !== undefined && typeof str === "number") {
        res = " ".repeat(needLen - str.toString().length) + (str + "");
    }
    return res;
}

//create table function
function createTable(tableData) {
    // get size
    let size = tableSize(tableData);

    let header,
        bottom,
        separate = "";
    columns.forEach((element, index) => {
        // if first
        if (index === 0) {
            header = boxDraw.lTopCorn + boxDraw.hor.repeat(size[element]);
            bottom = boxDraw.lBotCorn + boxDraw.hor.repeat(size[element]);
            separate = boxDraw.tLeft + boxDraw.hor.repeat(size[element]);
        }
        // if last
        else if (index === columns.length - 1) {
            header += boxDraw.hor.repeat(size[element]) + boxDraw.rTopCorn + "\n";
            bottom += boxDraw.hor.repeat(size[element]) + boxDraw.rBotCorn + "\n";
            separate += boxDraw.hor.repeat(size[element]) + boxDraw.tRight + "\n";
        }
        // if inside
        else {
            header += boxDraw.tTop + boxDraw.hor.repeat(size[element]) + boxDraw.tTop;
            bottom += boxDraw.tBot + boxDraw.hor.repeat(size[element]) + boxDraw.tBot;
            separate +=
                boxDraw.xCenter + boxDraw.hor.repeat(size[element]) + boxDraw.xCenter;
        }
    });
    // add header
    let table = header;

    tableData.forEach((row, inrow) => {
        table += boxDraw.vert;
        columns.forEach((col) => {
            table += `${createString(row[col], size[col])}${boxDraw.vert}`;
        });
        table += "\n";
        inrow < tableData.length - 1 ? (table += separate) : (table += "");
    });
    // add bottom
    table += bottom;

    return table;
}
console.log(createTable(data));
