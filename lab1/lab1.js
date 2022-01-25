const questionOne = function questionOne(arr) {
	let sum = 0;
	arr.map((num) => {
		sum = sum + num * num;
	});
	return sum;
};

const questionTwo = function questionTwo(num) {
	if (num < 0) {
		return 0;
	}
	if (num === 1 || num === 2) {
		return 1;
	} else {
		return questionTwo(num - 1) + questionTwo(num - 2);
	}
};

const questionThree = function questionThree(text) {
	let num = 0;
	for (let i = 0; i < text.length; i++) {
		if (
			text[i] === "a" ||
			text[i] === "e" ||
			text[i] === "i" ||
			text[i] === "o" ||
			text[i] === "u"
		) {
			num++;
		}
	}
	return num;
};

const questionFour = function questionFour(num) {
	let result = 1;
	if (num < 0) {
		return NaN;
	} else {
		for (let i = num; i >= 1; i--) {
			result = result * i;
		}
	}
	return result;
};

module.exports = {
	firstName: "Brendan",
	lastName: "Probst",
	studentId: "10450129",
	questionOne,
	questionTwo,
	questionThree,
	questionFour,
};
