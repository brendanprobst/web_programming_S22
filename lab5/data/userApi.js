const axios = require("axios");
function validateId(id) {
	if (typeof id !== "string") throw new Error("invalid id");
	id = parseInt(id);
	if (!id) throw "id must be a number";
	if (id < 0) throw new Error("Id must be a positive number");
	return true;
}
const hello = async function hello() {
	return "Hello";
};
const getPeople = async function getPeople() {
	const people = await axios.get(
		"https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json"
	);
	return people.data;
};

const getPersonById = async function getPersonById(id) {
	validateId(id);
	id = parseInt(id);
	const people = await getPeople();
	// return people;
	for (person of people) {
		if (person.id === id) {
			return person;
		}
	}
	throw "No Person with that id was found";
};
const getWork = async function getWork() {
	let work = await axios.get(
		"https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json"
	);
	return work.data;
};
const getWorkById = async function getWorkById(id) {
	validateId(id);
	id = parseInt(id);

	let work = await getWork();
	for (company of work) {
		if (company.id === id) {
			return company;
		}
	}
	throw new Error("No Company with that id was found");
};
module.exports = {
	hello,
	getPeople,
	getPersonById,
	getWork,
	getWorkById,
};
