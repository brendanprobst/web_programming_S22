function isObj(obj) {
	return typeof obj === "object";
}
// That the array exists
function makeArrays(objects) {
	if (objects === null) {
		throw "input must be an array";
	}
	if (!Array.isArray(objects)) {
		throw "input must be an array";
	}
	if (objects.length === 0) {
		throw "must have two elements in the array";
	}
	let array = [];
	for (obj of objects) {
		if (obj !== {} && isObj(obj)) {
			let tempArr = [];
			for (key in obj) {
				tempArr.push([key, obj[key]]);
			}
			array.push(tempArr);
		}
	}
	return array;
}

function isDeepEqual(obj1, obj2) {
	if (isObj(obj1) && isObj(obj2)) {
		if (Array.isArray(obj1) || Array.isArray(obj2)) {
			throw "cannot be an array";
		}
		if (obj1 === {} && obj2 === {}) {
			return true;
		}
		if (Object.keys(obj1).length !== Object.keys(obj2).length) {
			return false;
		} else {
			for (key in obj1) {
				if (key in obj2) {
					if (isObj(obj1[key]) && isObj(obj2[key])) {
						return isDeepEqual(obj1[key], obj2[key]);
					}
					if (obj1[key] !== obj2[key]) {
						return false;
					}
				} else {
					return false;
				}
			}
		}
	} else {
		throw "must be an object";
	}
	return true;
}
function computeObject(obj, func) {
	if (isObj(obj) && typeof func === "function") {
		for (key in obj) {
			if (typeof obj[key] === "number") {
				obj[key] = func(obj[key]);
			}
		}
	} else {
		throw "not a function";
	}
	return obj;
}
module.exports = {
	makeArrays,
	isDeepEqual,
	computeObject,
};
