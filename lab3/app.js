const Stocks = require("./stocks.js");
const People = require("./people");
async function main() {
	try {
		let personId = await People.getPersonById(
			"e5d99574-b3f3-4338-8a2b-be97217da9c3"
		);
		console.log(personId);
	} catch (e) {
		console.log(e);
	}
	try {
		let email = await People.sameEmail("harvard.edu");
		console.log(email);
	} catch (e) {
		console.log(e);
	}

	try {
		let ip = await People.manipulateIp();
		console.log(ip);
	} catch (e) {
		console.log(e);
	}
	try {
		let birthday = await People.sameBirthday("9", "25");
		console.log(birthday);
	} catch (e) {
		console.log(e);
	}
	try {
		let stockHolders = await Stocks.listShareHolders("Just Energy Group, Inc.");
		console.log(stockHolders);
	} catch (e) {
		console.log(e);
	}
	try {
		let shares = await Stocks.totalShares("Just Energy Group, Inc.");
		console.log(shares);
	} catch (e) {
		console.log(e);
	}
	try {
		let stocks = await Stocks.listStocks("Grenville", "Pawelke");
		console.log(stocks);
	} catch (e) {
		console.log(e);
	}
	try {
		let stockId = await Stocks.getStockById(
			"f652f797-7ca0-4382-befb-2ab8be914ff0"
		);
		console.log(stockId);
	} catch (e) {
		console.log(e);
	}
}
main();
