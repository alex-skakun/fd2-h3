

let columns = ['name', 'count', 'price']; 
let data = [ 
    {name: 'Хлеб', count: 12, price: 14.99}, 
    {name: 'Молоко', count: 3, price: 3.2}, 
    {name: 'Сыр', count: 1, price: 10}, 
    {name: 'Вода', count: 2, price: 5.5}, 
]; 
 let textTable = []; 
 
function createTextTable(columns, data) { 
  for (let i = 0; i < data.length; i++) { 
    if (data[i].length < columns[i]) { 
      let columnWidth = columns[i] - data[i].length; 
      let space = ''; 
      for (j = 0; j < columnWidth; j++) { 
        space = space + ''; 
      } 
textTable.push(data[i] + space) 
    } 
    else { 
      textTable.push(data[i]); 
    } 
  }  
  return textTable; 
} 
console.table(createTextTable(columns, data));























