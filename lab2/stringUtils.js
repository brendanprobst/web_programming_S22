function isString(val) {
	if (typeof val === "string") {
		return true;
	} else {
		return false;
	}
}
function camelCase(string) {
	if (isString(string) && string !== null && string.length !== 0) {
		//loop through
		//if index is 0, push upper
		//else push lower
		//if currentindex is space, skip, push next one upper
		let newString = "";
		newString = newString.concat(string.charAt(0).toLowerCase());
		for (let i = 1; i <= string.length; i++) {
			if (string.charAt(i) !== " ") {
				if (string.charAt(i - 1) === " ") {
					newString = newString.concat(string.charAt(i).toUpperCase());
				} else {
					newString = newString.concat(string.charAt(i).toLowerCase());
				}
			}
		}
		return newString;
	} else {
		throw "input must be non empty string";
	}
}
function replaceChar(string) {
	if (isString(string) && string !== null && string.length >= 2) {
		let keyChar = string.substr(0, 1).toLowerCase();
		let isAsterisk = true;
		for (let i = 1; i <= string.length; i++) {
			if (string.charAt(i) === keyChar) {
				if (isAsterisk) {
					string = string.substr(0, i).concat("*", string.substr(i + 1));
				} else {
					string = string.substr(0, i).concat("$", string.substr(i + 1));
				}
				isAsterisk = !isAsterisk;
			}
		}
		return string;
	} else {
		throw "input must be a string of at least 2 characters";
	}
}
function mashUp(string1, string2) {
	if (
		isString(string1) &&
		string1 !== null &&
		isString(string2) &&
		string2 !== null &&
		string1.length >= 2 &&
		string2.length >= 2
	) {
		let newString1 = string1.substr(0, 2).concat(string2.substr(2));
		let newString2 = string2.substr(0, 2).concat(string1.substr(2));
		let finalString = newString1.concat(" ", newString2);
		return finalString;
	} else {
		throw "inputs must consist of two strings of at least 2 characters";
	}
}
module.exports = {
	camelCase,
	replaceChar,
	mashUp,
};
