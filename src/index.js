const columns = ['name', 'count', 'price'];
const data = [
    {name: 'Хлеб', count: 12, price: 14.99},
    {name: 'Молоко', count: 3, price: 3.2},
    {name: 'Сыр', count: 1, price: 10},
    {name: 'Вода', count: 2, price: 5.5},
];


const tableUp = '\u250C'+'\u2500'+'\u252C'+'\u2500'+'\u252C'+'\u2500'+'\u2510'
console.log(tableUp)
data.forEach( data => {
console.log(`\u2502 ${data.name} \u2502 ${data.count} \u2502 ${data.price} \u2502`);
console.log('\u251C\u2500\u253C\u2500\u253C\u2500\u2524')
});
