'use strict';
 // Создайте функцию createTextTable, которая должна создавать текстовую таблицу на основе полученных данных. Функция будет принимать два аргумента и возвращать строку с текстовой таблицей. Первым аргументом функция принимает массив строк, где каждая строка это id колонки. Вторым аргументом функция принимает массив объектов, каждый объект это строка в таблице.

// результат в консоли:
// ┌────────┬────┬───────┐
// │ Хлеб   │ 12 │ 14.99 │
// ├────────┼────┼───────┤
// │ Молоко │  3 │   3.2 │
// ├────────┼────┼───────┤
// │ Сыр    │  1 │    10 │
// ├────────┼────┼───────┤
// │ Вода   │  2 │   5.5 │
// └────────┴────┴───────┘

// Обратите внимание, что текст в колонках имеет разную длину, а значит менее длинный текст нужно дополнить пробелами. Текст должен выравниваться по левому краю, а числа по правому. Для формирования рамок таблицы используйте специальные символы box drawing.

 
const columns = ['name', 'count', 'price', 'sklad'];
const data = [
    {name: 'Хлеб', count: 12, price: 14.99, sklad: 3},
    {name: 'Молоко', count: 3, price: 3.2},
    {name: 'Сыр', count: 0, price: 10},
    {name: 'Вода', count: 2, price: 5.5},
    {name: 'Абуз', count: 22, price:  35.5, sklad: 3},
    {name: 'Дыня', price:  35},
];
 
let str='';
// получаем макс длинну  столбцов
function getLegth(arrData, columns){
    // записываем в массив длинну столбцов
    let arrLeng = [];
    // заполняем массив длинной наименований колонок
    columns.map(item => arrLeng.push(item.length));
    // сравниваем с длинной в основной таблице и перезаписываем если значения их превышает
    arrData.map( (item) => {
        let i = 0;
        for (let key in item ) {
            // длинна Item
            let itemLeng =  item[key].toString().length;
            // длинна Item больше длинны массива - перезаписываем значение
            itemLeng > arrLeng[i] ? arrLeng[i] = itemLeng : arrLeng[i];
            i++;
        }
    });
    return arrLeng;
};

// запускаем функцию вычисленния длинны столбцов
let longEveryColums = getLegth(data,columns);
// console.log( longEveryColums);

// выводим спец символы
const specArr= {
    'specHoriz' : '\u2500', //console.log(specHoriz);  // ━
    'specVert' : '\u2502', // console.log(specVert);  // │
    'specLeftMidl' : '\u251C', //console.log(specLeftMidl);  //  ┝
    'specRightMidl' : '\u2524', //console.log(specRightMidl);  //  ┥
    'specLeftTop' : '\u250C', //console.log(specLeftTop);  //  ┍
    'specRightTop' : '\u2510',// console.log(specRightTop);  //  ┑
    'specLeftBottom' : '\u2514',//console.log(specLeftBottom);  //  └
    'specRightBottom' : '\u2518', //console.log('\u2518');  //  ┘
    'specTopMidl' : '\u252C', //console.log(specTopMidl);  //  ┯
    'specBottomMidl' : '\u2534',  //console.log(specBottomMidl);  //  ┷
    'specAccros' : '\u253C', //console.log(specAccros);  //  ┿
    'space' : ' ',
};

// деструктуризация 
let {specHoriz, specVert, specLeftMidl, specRightMidl, specLeftTop,
   specRightTop, specLeftBottom, specRightBottom, specTopMidl, specBottomMidl,
   specAccros, space} = specArr;

// отрисовка части таблицы - верх , низ или середина  
function headerAndTopTable(arr, left, right, horiz, specHor){
    let str='';
    // рисуем верх
    for(let i=0; i < arr.length; i++){  
        for(let k=0; k < arr[i]; k++){  
            // лев символ
            if(k == 0 && i == 0) {
                str += `${left}`;      
            }
            // горизонт симв
            if(   k < arr[i] ) {
                 str += `${horiz}`;
            }
            // горизонт вставка
            if( k == arr[i] - 1 && i !== arr.length-1) {
                str += `${specHor}`;      
            }
            // прав символ
            if(i==arr.length-1 && k == arr[i]-1) {
                str += `${right}\n`;
            }
        }
    }
 return str;  
};

// рендеринг шапки таблицы с наименованием (не было в ДЗ)
function nameTable(columns) {
    columns.map((item, ind)=>{
        let cauntSpaces = longEveryColums[ind] - item.length;
        str += `${specVert}${item}${space.repeat(cauntSpaces)}`;
    });
    str += `${specVert}\n`;
    return str;
}

// рендернинг основной  таблицы
function createTextTable(arr, columns) {
    if ((!columns || (columns && !columns.length)) || 
    (!arr || (arr && !arr.length))) return null;
    // отрисовываем верх таблицы
    let str = headerAndTopTable(longEveryColums,specLeftTop, specRightTop, specHoriz, specTopMidl) ;
    // рендернинг наименование таблицы
    str += nameTable(columns);
     // рендернинг значений между таблицы
    str += headerAndTopTable(longEveryColums,specLeftMidl, specRightMidl, specHoriz, specAccros);
    //отрисовка самой таблицы
    arr.map((item, ind)=>{
        // проходим по каждому item и заполняем массив значениями
        for (let i = 0; i < columns.length; i++) {
            let nameItems = item[columns[i]];
            let cauntSpaces = 0;
            // если в массиве отсуствует заполненное поле то его заполняем пробелами
            if(nameItems !== undefined){
                // console.log(nameItems.toString().length);
                cauntSpaces = longEveryColums[i] - nameItems.toString().length;
                columns[i] == 'name'
                ? str += `${specVert}${item[columns[i]]}${space.repeat(cauntSpaces)}`
                : str += `${specVert}${space.repeat(cauntSpaces)}${item[columns[i]]}`;
            } else{
                str += `${specVert}${space.repeat(longEveryColums[i])}`;
            }
        }
            str += specVert + '\n';
    // отрисовка  меду строками, кроме последнего вычисления
        if (ind < arr.length - 1 ) {
            str += headerAndTopTable(longEveryColums,specLeftMidl, specRightMidl, specHoriz, specAccros);
        };    
    });

    // заполняем низ таблицы
    str += headerAndTopTable(longEveryColums,specLeftBottom, specRightBottom, specHoriz, specBottomMidl);
    return str;
}
 

console.log( createTextTable(data, columns));   
// console.table( data );   
 

 