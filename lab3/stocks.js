const { default: axios } = require("axios");
const People = require("./people.js");

async function getStocks() {
	//gets and sets .json data and returns it as an array

	const { data } = await axios.get(
		"https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
	);
	return data;
}

function stringIsValid(stock) {
	//checks if string is valid
	if (
		stock !== null &&
		typeof stock === "string" &&
		!People.isEmptySpaces(stock)
	) {
		return true;
	} else {
		throw "input must be a valid string that isn't empty spaces";
	}
}
async function listShareHolders(stockName) {
	let stockObj = { id: "", stock_name: stockName, shareholders: [] };
	if (stringIsValid(stockName)) {
		let stocks = await getStocks();
		for (let i = 0; i < stocks.length; i++) {
			if (stocks[i].stock_name === stockName) {
				stockObj.id = stocks[i].id;
				for (let j = 0; j < stocks[i].shareholders.length; j++) {
					let person = await People.getPersonById(
						stocks[i].shareholders[j].userId
					);
					stockObj.shareholders.push({
						first_name: person.first_name,
						last_name: person.last_name,
						number_of_shares: stocks[i].shareholders[j].number_of_shares,
					});
				}
			}
		}

		return stockObj;
	}
}
async function totalShares(stockName) {
	let numShareHolders = 0;
	let totalShares = 0;
	if (stringIsValid(stockName)) {
		let stocks = await getStocks();
		for (let i = 0; i < stocks.length; i++) {
			if (stocks[i].stock_name === stockName) {
				for (let j = 0; j < stocks[i].shareholders.length; j++) {
					totalShares += stocks[i].shareholders[j].number_of_shares;
					numShareHolders++;
				}
			}
		}
		if (numShareHolders === 0) {
			return `${stockName}, currently has no shareholders.`;
		}
		if (numShareHolders === 1) {
			return `${stockName}, has 1 shareholder that owns a total of ${totalShares} shares.`;
		} else {
			return `${stockName}, has ${numShareHolders} shareholders that own a total of ${totalShares} shares.`;
		}
	}
}
async function listStocks(firstName, lastName) {
	if (stringIsValid(firstName) && stringIsValid(lastName)) {
		let stockList = [];
		let personId = "";
		let people = await People.getPeople();
		let stocks = await getStocks();
		for (let i = 0; i < people.length; i++) {
			if (
				people[i].first_name === firstName &&
				people[i].last_name === lastName
			) {
				personId = people[i].id;
			}
		}
		if (personId !== "") {
			for (let i = 0; i < stocks.length; i++) {
				for (let j = 0; j < stocks[i].shareholders.length; j++) {
					if (stocks[i].shareholders[j].userId === personId) {
						stockList.push({
							stock_name: stocks[i].stock_name,
							number_of_shares: stocks[i].shareholders[j].number_of_shares,
						});
					}
				}
			}
		} else {
			throw "person does not exist";
		}
		return stockList;
	}
}
async function getStockById(id) {
	if (stringIsValid(id)) {
		let stocks = await getStocks();
		for (let i = 0; i < stocks.length; i++) {
			if (stocks[i].id === id) {
				return stocks[i];
			}
		}
		throw "stock not found ";
	}
}
module.exports = {
	listShareHolders,
	totalShares,
	listStocks,
	getStockById,
};
// let stockHolders = listShareHolders("Just Energy Group, Inc.");
// console.log(stockHolders);
// stockHolders
// 	.then(function (result) {
// 		console.log(result);
// 	})
// 	.catch(function (err) {
// 		console.log(err);
// 	});
