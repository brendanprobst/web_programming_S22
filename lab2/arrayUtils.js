function checkIfArray(array) {
	if (!Array.isArray(array)) {
		throw "must be an array";
	} else return true;
}

function mean(array) {
	if (array !== null && array.length !== 0 && checkIfArray(array)) {
		let sum = 0;
		for (let i = 0; i <= array.length - 1; i++) {
			if (typeof array[i] !== "number") {
				throw "must be a number";
				break;
			} else {
				sum = sum + array[i];
			}
		}
		let average = sum / array.length;
		return average;
	}
}
function medianSquared(array) {
	let l = array.length;
	let median = 0;
	if (array !== null && l !== 0 && checkIfArray(array)) {
		for (idx of array) {
			if (typeof idx !== "number") {
				throw "elements must be numbers";
			}
		}

		array.sort();
		if (array.length % 2 === 0) {
			median = (array[l / 2 - 1] + array[l / 2]) / 2;
		} else {
			median = array[(l + 1) / 2 - 1];
		}
		return Math.pow(median, 2);
	}
}
function maxElement(array) {
	if (array !== null && array.length !== 0 && checkIfArray(array)) {
		let currentMax = -99999999999999;
		let currentMaxPos = null;
		for (let i = 0; i < array.length; i++) {
			if (typeof array[i] !== "number") {
				throw "elements must be numbers";
			}
			if (array[i] > currentMax) {
				currentMax = array[i];
				currentMaxPos = i;
			}
		}
		let returnObj = {};
		returnObj[currentMax] = currentMaxPos;
		return returnObj;
	} else {
		throw "input must be an array";
	}
}
console.log(maxElement([5, 6, 8]));
function fill(end, value) {
	if (end !== null && typeof end === "number" && end > 0) {
		let newArray = [];
		if (value === null) {
			for (let i = 0; i < end; i++) {
				newArray.push(i);
			}
		} else {
			for (let i = 0; i < end; i++) {
				newArray.push(value);
			}
		}
	} else {
		throw "end must be a number";
	}
}
function countRepeating(array) {
	if (typeof array !== "object") {
		throw "must be an array";
	}
	if (array === []) {
		return {};
	} else {
		let repeatObj = {};
		for (let i of array) {
			if (i in repeatObj) {
				repeatObj[i]++;
			} else repeatObj[i] = 1;
		}
		for (let i in repeatObj) {
			if (repeatObj[i] === 1) {
				delete repeatObj[i];
			}
		}
		return repeatObj;
	}
}
function isEqual(arrayOne, arrayTwo) {
	// console.log("beginging", arrayOne, arrayTwo);
	if (arrayOne.length === arrayTwo.length) {
		// console.log("last thing that will be logged");
		checkIfArray(arrayOne);
		checkIfArray(arrayTwo);
		arrayOne.sort();
		// console.log("1sorted", arrayOne);
		arrayTwo.sort();
		// console.log("2sorted", arrayTwo);
		for (let i = 0; i < arrayOne.length; i++) {
			if (Array.isArray(arrayOne[i])) {
				// console.log("checking if array", arrayOne, arrayTwo);
				if (isEqual(arrayOne[i], arrayTwo[i])) {
					arrayOne.shift();
					arrayTwo.shift();
					return isEqual(arrayOne, arrayTwo);
				} else {
					return false;
				}
			}

			if (arrayOne[i] !== arrayTwo[i]) {
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}

module.exports = {
	firstName: "Brendan",
	lastName: "Probst",
	studentId: "10450129",
	mean,
	fill,
	countRepeating,
	isEqual,
	medianSquared,
	maxElement,
};
