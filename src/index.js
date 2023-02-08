const columns = ['name', 'count', 'price'];
 const data = [
     {name: 'Хлеб', count: 12, price: 14.99},
     {name: 'Молоко', count: 3, price: 3.2},
     {name: 'Сыр', count: 0, price: 10},
 ];

 let str = '';

function getLong(arrayData, columns){
    let arrayLong = [];
    columns.map(item => arrayLong.push(item.length));
    arrayData.map((item) => {
        let i = 0;
        for (let key in item) {
            let itemLeng = item[key].toString().length;
            itemLeng > arrayLong[i] ? arrayLong[i] = itemLeng : arrayLong[i];
            i++;
        }
    });
    return arrayLong;
};
 let longColums = getLong(data,columns);
 const borders = {
     'Horizont' : '\u2500', 
     'Vertical' : '\u2502', 
     'MidlLeft' : '\u251C', 
     'MidlRight' : '\u2524', 
     'TopLeft' : '\u250C', 
     'TopRight' : '\u2510',
     'BottomLeft' : '\u2514',
     'BottomRight' : '\u2518', 
     'MidlTop' : '\u252C', 
     'MidlBottom' : '\u2534', 
     'Accros' : '\u253C', 
     'space' : ' ',
 };

 let {Horizont, Vertical, MidlLeft, MidlRight, TopLeft,
    TopRight, BottomLeft, BottomRight, MidlTop, MidlBottom,
    Accros, space} = borders;

 function TableHeaderTop(arr, left, right, horiz, specHor){
     let str='';
     for(let i=0; i < arr.length; i++){  
         for(let k=0; k < arr[i]; k++){  
             if(k == 0 && i == 0) {
                 str += `${left}`;      
             }
             if(   k < arr[i] ) {
                  str += `${horiz}`;
             }
             if( k == arr[i] - 1 && i !== arr.length-1) {
                 str += `${specHor}`;      
             }
             if(i==arr.length-1 && k == arr[i]-1) {
                 str += `${right}\n`;
             }
         }
     }
  return str;  
 };

 function tableName(columns) {
     columns.map((item, ind)=>{
         let cauntSpaces = longColums[ind] - item.length;
         str += `${Vertical}${item}${space.repeat(cauntSpaces)}`;
     });
     str += `${Vertical}\n`;
     return str;
 }

 function createTable(arr, columns) {
     if ((!columns || (columns && !columns.length)) || 
     (!arr || (arr && !arr.length))) return null;
     let str = TableHeaderTop(longColums, TopLeft, TopRight, Horizont, MidlTop) ;
     str += tableName(columns);
     str += TableHeaderTop(longColums, MidlLeft, MidlRight, Horizont, Accros);
     arr.map((item, ind)=>{
         for (let i = 0; i < columns.length; i++) {
             let nameItems = item[columns[i]];
             let cauntSpaces = 0;
             if(nameItems !== undefined){
                 cauntSpaces = longColums[i] - nameItems.toString().length;
                 columns[i] == 'name'
                 ? str += `${Vertical}${item[columns[i]]}${space.repeat(cauntSpaces)}`
                 : str += `${Vertical}${space.repeat(cauntSpaces)}${item[columns[i]]}`;
             } else{
                 str += `${Vertical}${space.repeat(longColums[i])}`;
             }
         }
             str += Vertical + '\n';
         if (ind < arr.length - 1 ) {
             str += TableHeaderTop(longColums, MidlLeft, MidlRight, Horizont, Accros);
         };    
     });
     str += TableHeaderTop(longColums, BottomLeft, BottomRight, Horizont, MidlBottom);
     return str;
 }
 console.log( createTable(data, columns));