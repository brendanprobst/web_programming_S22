const { default: axios } = require("axios");

async function getPeople() {
	//gets and sets .json data and returns it as an array
	const { data } = await axios.get(
		"https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
	);
	return data;
}
function isString(val) {
	//checks if something is of type string
	if (typeof val === "string") {
		return true;
	} else {
		return false;
	}
}
function isEmptySpaces(val) {
	//returns true if a string is all empty spaces
	let isEmpty = false;
	for (let i = 0; i < val.length; i++) {
		if (val[i] === " ") {
			isEmpty = true;
		} else return false;
	}
	return isEmpty;
}
async function getPersonById(id) {
	let people = await getPeople();

	if (id !== null && isString(id)) {
		if (isEmptySpaces(id)) {
			throw "id cannot be a string of empty spaces";
		} else {
			for (let i = 0; i < people.length; i++) {
				if (people[i].id === id) {
					return people[i];
				}
			}
			throw "person not found";
		}
	} else {
		throw "id must be a string";
	}
}

function checkEmailIsValid(emailDomain) {
	if (emailDomain !== null && isString(emailDomain)) {
		if (!isEmptySpaces(emailDomain)) {
			if (emailDomain.indexOf(".") !== -1) {
				if (emailDomain[emailDomain.indexOf(".") + 2]) {
					return true;
				} else {
					throw "there must be 2 characters after each '.'";
				}
			} else {
				throw "email domain must contain a '.'";
			}
		} else {
			throw "email domain cannot be a string of empty spaces";
		}
	} else {
		throw "emailDomain must be a string";
	}
}
async function sameEmail(emailDomain) {
	//TODO: handle all caps cases
	let returnArr = [];
	if (checkEmailIsValid(emailDomain)) {
		let people = await getPeople();
		for (let person of people) {
			if (person.email.indexOf(emailDomain) !== -1) {
				returnArr.push(person);
			}
		}
		if (returnArr.length < 2) {
			throw "must be at least two people with email domain ";
		} else {
			return returnArr;
		}
	}
}

function ipToNum(ip_address) {
	let array = [];
	let string = "";
	for (let i = 0; i < ip_address.length; i++) {
		if (ip_address[i] !== ".") {
			array.push(ip_address[i]);
		}
	}
	array.sort();
	for (let i = 0; i < array.length; i++) {
		string = string + array[i];
	}
	let number = parseInt(string);
	return number;
}
async function manipulateIp() {
	let people = await getPeople();
	let numPeople = people.length;
	let totalIpSum = 0;
	let highestIp = -99999999999999;
	let lowestIp = 99999999999999;
	let result = {
		highest: { firstName: "", lastName: "" },
		lowest: { firstName: "", lastName: "" },
		average: 0,
	};

	for (let i = 0; i < numPeople; i++) {
		totalIpSum = totalIpSum + ipToNum(people[i].ip_address);
		if (ipToNum(people[i].ip_address) < lowestIp) {
			lowestIp = ipToNum(people[i].ip_address);
			result.lowest = {
				firstName: people[i].first_name,
				lastName: people[i].last_name,
			};
		}
		if (ipToNum(people[i].ip_address) > highestIp) {
			highestIp = ipToNum(people[i].ip_address);
			result.highest = {
				firstName: people[i].first_name,
				lastName: people[i].last_name,
			};
		}
	}
	result.average = Math.floor(totalIpSum / numPeople);
	return result;
}

function checkBirthday(month, day) {
	let maxDays = 0;

	if (
		month !== null &&
		typeof month === "number" &&
		day !== null &&
		typeof day === "number"
	) {
		if (month > 1 && month <= 12) {
			switch (month) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					maxDays = 31;
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					maxDays = 30;
					break;
				case 2:
					maxDays = 29;
			}
			if (day <= maxDays) {
				return true;
			} else {
				throw "Days are invalid for given month";
			}
		} else {
			throw "month is not a valid month";
		}
	} else {
		throw "month and day must be numbers";
	}
}
function checkIfBirthdayIsSame(date, month, day) {
	let personMonth = parseInt(date.substring(0, 2));
	let personDay = parseInt(date.substring(3, 5));
	if (personMonth === month && personDay === day) {
		return true;
	} else return false;
}
async function sameBirthday(month, day) {
	if (typeof month === "string") {
		month = parseInt(month);
	}
	if (typeof day === "string") {
		day = parseInt(day);
	}
	let array = [];
	if (checkBirthday(month, day)) {
		let people = await getPeople();
		for (let person of people) {
			if (checkIfBirthdayIsSame(person.date_of_birth, month, day)) {
				array.push(`${person.first_name} ${person.last_name}`);
			}
		}
	}
	if (array.length < 2) {
		throw "two people don't have this birthday";
	} else {
		return array;
	}
}

module.exports = {
	getPeople,
	isString,
	isEmptySpaces,
	getPersonById,
	sameEmail,
	manipulateIp,
	sameBirthday,
};
