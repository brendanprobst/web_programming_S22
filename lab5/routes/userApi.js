const express = require("express");
const router = express.Router();
const data = require("../data");
router.route("/people").get(async (req, res) => {
	try {
		const people = await data.getPeople();
		console.log(people);
		res.json(people);
	} catch (e) {
		res.status(404).json(e);
	}
});

router.route("/").get(async (req, res) => {
	try {
		let { string } = await data.hello();
		res.json("hello");
	} catch (e) {
		res.status(404).json(e);
	}
});

module.exports = router;
