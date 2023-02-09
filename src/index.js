'use strict';

const columns = ['name', 'count', 'price'];
const data = [
	{
		name: 'Хлеб',
		count: '12',
		price: '14.99',
	},
	{
		name: 'Молоко',
		count: '3',
		price: '3.2',
	},
	{
		name: 'Сыр',
		count: '1',
		price: '10',
	},
	{
		name: 'Вода',
		count: '2',
		price: '5.5',
	},
	{
		name: 'Бензогенератор',
		count: '145',
		price: '24695',
	},
];

function getMaxLengthOfElements(id) {
let elementLength;
for (let i = 0; i < data.length; i++) {
	i === 0 ? elementLength = data[i][id].length :
elementLength = Math.max(elementLength, data[i][id].length);
}
return elementLength;
}

function arrLength() {
	let arrMaxLengthElem = [];
	for (let column of columns) {
		arrMaxLengthElem.push(getMaxLengthOfElements(column));
	}
	return arrMaxLengthElem;
}

function doSpace(id) {
	data.forEach(elem => {
		if (isFinite(elem[id])) {
			let subtr = getMaxLengthOfElements(id) - elem[id].length;
			for (let i = 0; i < subtr; i++) {
				elem[id] = ' ' + elem[id];
			}
		} else {
			let subtr = getMaxLengthOfElements(id) - elem[id].length;
			for (let i = 0; i < subtr; i++) {
				elem[id] += ' ';
			}
		}
		return elem;
	});
}

function fillSpacesInSpace() {
	for (let column of columns) {
		 doSpace(column);
	}
}

function generateBorderHigh() {
	let borderHigh = '\u250F\u2501';
	for (let i = 0; i < arrLength().length; i++) {
		for (let j = 0; j < arrLength()[i]; j++) {
			borderHigh += '\u2501';
		}
		borderHigh = i === arrLength().length - 1 ? borderHigh + '\u2501\u2513' : borderHigh + '\u2501\u252F\u2501';
	}
	return borderHigh;
}
let drawBorderHigh = generateBorderHigh();

function generateBorderDown() {
	let borderDown = '\u2517\u2501';
	for (let i = 0; i < arrLength().length; i++) {
		for (let j = 0; j < arrLength()[i]; j++) {
			borderDown += '\u2501';
		}
		borderDown= i === arrLength().length - 1 ? borderDown + '\u2501\u251B' : borderDown + '\u2501\u2537\u2501';
	}
	return borderDown;
}

function generateLineBetweenData() {
	let lineBetween = '\u2523\u2501';
	for (let i = 0; i < arrLength().length; i++) {
		for (let j = 0; j < arrLength()[i]; j++) {
			lineBetween += '\u2501';
		}
		lineBetween = i === arrLength().length - 1 ? lineBetween + '\u2501\u252B' :
		lineBetween + '\u2501\u2542\u2501';
	}
	return lineBetween;
}
let drawLineBetween = generateLineBetweenData();

function generateDataBorder(obj) {
let borderData = '\u2503 ';
for (let column of columns) {
	borderData += obj[column] + ' \u2503 ';
}
return borderData;
}

function createTableText() {
	let lineFeed = '\n';
	fillSpacesInSpace();
	let finalTable = '';
	finalTable = drawBorderHigh + lineFeed;
	for (let i = 0; i < data.length; i++) {
		if (i === data.length - 1) {
			finalTable += generateDataBorder(data[i]) + lineFeed;
			finalTable += generateBorderDown() + lineFeed;
		} else {
			finalTable += generateDataBorder(data[i]) + lineFeed;
			finalTable += drawLineBetween + lineFeed;
		}
	}
	return finalTable;
}

const textTable = createTableText(columns, data);
console.log(textTable);