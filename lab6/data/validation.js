const { ObjectId } = require("mongodb");
function exists(value, errMsg) {
	if (!value) throw `${errMsg} was not provided`;
}
function validId(id) {
	//checks if id is valid mongo id
	if (!id) throw "must provide an id";
	if (typeof id !== "string" || id.trim().length === 0)
		throw "id must be a string of non-empty spaces";
	id = id.trim();
	if (!ObjectId.isValid(id)) throw "invalid object id";
	return id;
}
function validString(string, errorMsg) {
	//checks if input is a string and isn't empty
	//throws error is it fails either case
	if (typeof string !== "string") throw `${errorMsg} must be a string`;
	if (string.trim().length === 0)
		throw `${errorMsg} cannot be an empty string or just spaces`;
	return true;
}
function validArrayOfString(array, errorMsg) {
	//checks if an array contains only non-empty strings
	if (!array || !Array.isArray(array))
		throw `You must provide an array of ${errorMsg}s`;
	if (array.length === 0) throw `You must supply at least one ${errorMsg}`;
	for (i in array) {
		if (typeof array[i] !== "string" || array[i].trim().length === 0) {
			throw "One or more genres is not a string or is an empty string";
		}
		array[i] = array[i].trim();
	}
	return true;
}
function validWebsite(website) {
	//checks if website contains 'http://www.' and '.com' and has at least 5 letters between
	if (website.indexOf("http://www.") === -1)
		throw "invalid website - must include http://www.";
	if (website.indexOf(".com") === -1)
		throw "invalid website - must include .com";
	if (website.length < 21) throw "invalid website - not long enough";
	return true;
}
function validYear(year, startYear, endYear) {
	if (typeof year !== "number")
		throw "year formed must be a number between 1900 and 2022";
	if (year < startYear)
		throw "year formed must be a number between 1900 and 2022";
	if (year > endYear)
		throw "year formed must be a number between 1900 and 2022";
}
function validDate(date) {
	var parts = date.split("/");
	var day = parseInt(parts[1], 10);
	var month = parseInt(parts[0], 10);
	var year = parseInt(parts[2], 10);

	if (year < 1900 || year > 2023 || month == 0 || month > 12)
		throw "invalid date";

	var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29;
	if (day < 0 && day > monthLength[month - 1]) {
		throw "Day out of range of month";
	}
}
function validRating(num) {
	if (typeof num !== "number") throw "Rating must be a number";
	if (num < 0 || num > 5) throw "Rating out of range";
}

module.exports = {
	validId,
	validString,
	validWebsite,
	validYear,
	validArrayOfString,
	exists,
	validDate,
	validRating,
};
