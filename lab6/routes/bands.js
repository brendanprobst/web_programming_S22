const express = require("express");
const router = express.Router();
const bandApi = require("../data/bands");
const {
	validString,
	validWebsite,
	validYear,
	validArrayOfString,
	exists,
	validId,
} = require("../data/validation.js");
router.get("/", async (req, res) => {
	try {
		let bands = await bandApi.getAll();
		res.status(200).json(bands);
	} catch (e) {
		res.status(404).json(e);
	}
});
router.get("/:id", async (req, res) => {
	let bandId = req.params.id;
	bandId = validId(bandId);
	console.log(bandId);
	try {
		let band = await bandApi.get(bandId);
		res.status(200).json(band);
	} catch (e) {
		res.status(404).json(e);
	}
});
router.post("/", async (req, res) => {
	try {
		const { name, genre, website, recordLabel, bandMembers, yearFormed } =
			req.body;
		exists(name, "name");
		exists(genre, "genre");
		exists(website, "website");
		exists(bandMembers, "band members");
		exists(yearFormed, "year formed");

		validString(name, "name");
		validString(website, "website");
		validString(recordLabel, "recordLabel");
		validWebsite(website);
		validArrayOfString(genre, "genre");
		validArrayOfString(bandMembers, "Band Member");
		validYear(yearFormed, 1900, 2022);
		try {
			const band = await bandApi.create(
				name,
				genre,
				website,
				recordLabel,
				bandMembers,
				yearFormed
			);
			res.status(200).json(band);
		} catch (e) {
			res.status(404).json(e);
		}
	} catch (e) {
		res.json(e);
	}
});
router.put("/:id", async (req, res) => {
	try {
		const bandId = req.params.id;
		const { name, genre, website, recordLabel, bandMembers, yearFormed } =
			req.body;
		exists(name, "name");
		exists(genre, "genre");
		exists(website, "website");
		exists(bandMembers, "band members");
		exists(yearFormed, "year formed");

		validString(name, "name");
		validString(website, "website");
		validString(recordLabel, "recordLabel");
		validWebsite(website);
		validArrayOfString(genre, "genre");
		validArrayOfString(bandMembers, "Band Member");
		validYear(yearFormed, 1900, 2022);
		try {
			const band = await bandApi.update(
				bandId,
				name,
				genre,
				website,
				recordLabel,
				bandMembers,
				yearFormed
			);
			res.status(200).json(band);
		} catch (e) {
			res.status(404).json(e);
		}
	} catch (e) {
		res.json(e);
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const bandId = req.params.id;
		validId(bandId);
		try {
			const band = await bandApi.remove(bandId);
			res.status(200).json(band);
		} catch (e) {
			res.status(404).json(e);
		}
	} catch (e) {
		res.status(404).json(e);
	}
});

module.exports = router;
