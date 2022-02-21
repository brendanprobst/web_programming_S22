const { default: axios } = require("axios");
function validateId(id) {
	if (typeof id !== "string") throw new Error("invalid id");
	let idNum = parseInt(id);
	if (!idNum.isInteger()) throw new Error("id must be an integer");
	if (idNum < 0) throw new Error("Id must be a positive number");
}
let exportedMethods = {
	async hello() {
		return "Hello";
	},
	async getPeople() {
		let people = await axios.get(
			"https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json"
		);
		return people;
	},
	async getPersonById(id) {
		validateId(id);
		let people = await getPeople();
		for (person in people) {
			if (person.id === id) {
				return person;
			}
		}
		throw new Error("No Person with that id was found");
	},
	async getWork() {
		let { work } = await axios.get(
			"https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json"
		);
		return work;
	},
	async getWorkById(id) {
		validateId(id);
		let work = await getWork();
		for (company in work) {
			if (company.id === id) {
				return company;
			}
		}
		throw new Error("No Company with that id was found");
	},
};

module.exports = exportedMethods;
