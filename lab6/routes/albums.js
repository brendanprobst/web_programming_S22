const express = require("express");
const { bands } = require("../config/mongoCollection");
const router = express.Router();
const albumApi = require("../data/albums");
const {
	validString,
	validId,
	validArrayOfString,
	exists,
	validDate,
	validRating,
} = require("../data/validation.js");

router.get("/:id", async (req, res) => {
	//gets all albums from a given band
	let bandId = req.params.id;
	bandId = validId(bandId);
	console.log(bandId);
	try {
		let albums = await albumApi.getAll(bandId);
		console.log("here before res.json");
		res.status(200).json(albums);
	} catch (e) {
		res.status(404).json(e);
	}
});
router.get("/album/:id", async (req, res) => {
	//gets album based on album id
	let albumId = req.params.id;
	albumId = validId(albumId);
	try {
		const album = await albumApi.get(albumId);
		console.log(album);
		res.status(200).json(album);
	} catch (e) {
		res.status(404).json(e);
	}
});
router.post("/", async (req, res) => {
	// creates new album
	try {
		const { bandId, title, releaseDate, tracks, rating } = req.body;
		exists(bandId, "Band Id");
		exists(title, "title");
		exists(releaseDate, "Release Data");
		exists(tracks, "tracks");
		exists(rating, "rating");
		validId(bandId);
		validString(title);
		validDate(releaseDate);
		validRating(rating);
		validArrayOfString(tracks);

		try {
			const album = await albumApi.create(
				bandId,
				title,
				releaseDate,
				tracks,
				rating
			);
			res.cdjson(album);
		} catch (e) {
			res.status(404).json(e);
		}
	} catch (e) {
		console.log(e);
		res.status(404).json(e);
	}
});
router.delete("/album/:id", async (req, res) => {
	let albumId = req.params.id;
	albumId = validId(albumId);
	try {
		const deletedAlbum = await albumApi.remove(albumId);
		res.status(200).json(deletedAlbum);
	} catch (e) {
		res.status(404).json(e);
	}
});
module.exports = router;
