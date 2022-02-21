const express = require("express");
const router = express.Router();
const Data = require("../data");
const apiData = Data.api;
router.route("/people").get(async (req, res) => {
	try {
		let people = await apiData.getPeople();
		res.json(people);
	} catch (e) {
		res.status(404).json(e);
	}
});
router.route("/people/:id").get(async (req, res) => {
	try {
		let person = await apiData.getPersonById(req.params.id);
		res.json(person);
	} catch (e) {
		res.status(404);
		res.json(e);
	}
});
router.route("/work").get(async (req, res) => {
	try {
		let work = await apiData.getWork();
		res.json(work);
	} catch (e) {
		res.status(404).json(e);
	}
});
router.route("/work/:id").get(async (req, res) => {
	try {
		let work = await apiData.getWorkById(req.params.id);
		res.json(work);
	} catch (e) {
		res.status(404).json(e);
	}
});

router.route("/").get(async (req, res) => {
	try {
		let string = await apiData.hello();
		console.log(string);
		res.json(string);
	} catch (e) {
		res.status(404).json(e);
	}
});

module.exports = router;
