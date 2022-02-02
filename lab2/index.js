const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");
//MEAN
try {
	arrayUtils.mean([1, 2, 4]);
	console.log("mean passed successfully");
} catch (e) {
	console.error("mean failed test case");
}
try {
	arrayUtils.mean(["hello", "what's", "up"]);
	console.log("mean did not error");
} catch (e) {
	console.error("mean failed successfully");
}
//MEAN
try {
	arrayUtils.mean([1, 2, 4]);
	console.log("mean passed successfully");
} catch (e) {
	console.error("mean failed test case");
}
try {
	arrayUtils.mean(["hello", "what's", "up"]);
	console.log("mean did not error");
} catch (e) {
	console.error("mean failed successfully");
}
//MEDIANSQUARED
try {
	arrayUtils.medianSquared([1, 2, 4]);
	console.log("medianSquared passed successfully");
} catch (e) {
	console.error("medianSquared failed test case");
}
try {
	arrayUtils.medianSquared(["hello", "what's", "up"]);
	console.log("medianSquared did not error");
} catch (e) {
	console.error("medianSquared failed successfully");
}
//MAXELEMENT
try {
	arrayUtils.maxElement([5, 6, 7]);
	console.log("maxElement passed successfully");
} catch (e) {
	console.error("maxElement failed test case");
}
try {
	arrayUtils.maxElement([]);
	console.log("maxElement did not error");
} catch (e) {
	console.error("maxElement failed successfully");
}
// FILL
try {
	arrayUtils.fill(6);
	console.log("fill passed successfully");
} catch (e) {
	console.error("fill failed test case");
}
try {
	arrayUtils.fill("test");
	console.log("fill did not error");
} catch (e) {
	console.error("fill failed successfully");
}
// COUNT REPEATING
try {
	arrayUtils.countRepeating([
		7,
		"7",
		13,
		true,
		true,
		true,
		"Hello",
		"Hello",
		"hello",
	]);
	console.log("countRepeating passed successfully");
} catch (e) {
	console.error("countRepeating failed test case");
}
try {
	arrayUtils.countRepeating();
	console.log("countRepeating did not error");
} catch (e) {
	console.error("countRepeating failed successfully");
}
//IS EQUAL
try {
	arrayUtils.isEqual(
		[
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		],
		[
			[3, 1, 2],
			[5, 4, 6],
			[9, 7, 11],
		]
	);
	console.log("isEqual passed successfully");
} catch (e) {
	console.error("isEqual failed test case");
}
try {
	arrayUtils.isEqual();
	console.log("isEqual did not error");
} catch (e) {
	console.error("isEqual failed successfully");
}

// STRINGS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CAMELCASE
try {
	stringUtils.camelCase("my function rocks");
	console.log("camelCase passed successfully");
} catch (e) {
	console.error("camelCase failed test case");
}
try {
	stringUtils.camelCase("");
	console.log("camelCase did not error");
} catch (e) {
	console.error("camelCase failed successfully");
}
//REPLACECHAR
try {
	stringUtils.replaceChar("daddy");
	console.log("replaceChar passed successfully");
} catch (e) {
	console.error("replaceChar failed test case");
}
try {
	stringUtils.replaceChar("");
	console.log("replaceChar did not error");
} catch (e) {
	console.error("replaceChar failed successfully");
}
//MASHUP
try {
	stringUtils.mashUp("Hello", "goodbye");
	console.log("mashUp passed successfully");
} catch (e) {
	console.error("mashUp failed test case");
}
try {
	stringUtils.mashUp("h", 3);
	console.log("mashUp did not error");
} catch (e) {
	console.error("mashUp failed successfully");
}

// OBJECTS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// MAKEARRAYS
try {
	objUtils.makeArrays([
		{ x: 2, y: 3 },
		{ a: 70, x: 4, z: 5 },
		{ x: 0, y: 9, q: 10 },
	]);
	console.log("makeArrays passed successfully");
} catch (e) {
	console.error("makeArrays failed test case");
}
try {
	objUtils.makeArrays({ a: 4, b: 3 });
	console.log("makeArrays did not error");
} catch (e) {
	console.error("makeArrays failed successfully");
}
// ISDEEPEQUAL
try {
	objUtils.isDeepEqual(
		{ a: 4, d: 3, b: { e: 12, g: 45 } },
		{ a: 4, d: 3, b: { e: 12, g: 45 } }
	);
	console.log("isDeepEqual passed successfully");
} catch (e) {
	console.error("isDeepEqual failed test case");
}
try {
	objUtils.isDeepEqual(["hello"], [{ hello: "world" }]);
	console.log("isDeepEqual did not error");
} catch (e) {
	console.error("isDeepEqual failed successfully");
}
//COMPUTEOBJECT
try {
	objUtils.computeObject({ a: 3, b: 7, c: 5 }, (n) => n * 2);
	console.log("computeObject passed successfully");
} catch (e) {
	console.error("computeObject failed test case");
}
try {
	objUtils.computeObject({ a: 3, b: 7, c: 5 }, 98);
	console.log("computeObject did not error");
} catch (e) {
	console.error("computeObject failed successfully");
}
