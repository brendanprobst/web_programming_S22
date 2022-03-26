const express = require("express");
const axios = require("axios");
const router = express.Router();
async function getShows() {
	const { data } = await axios.get("https://api.tvmaze.com/shows");
	return data;
}
async function searchShows(search) {
	const { data } = await axios.get(
		`https://api.tvmaze.com/search/shows?q=${search}`
	);
	return data;
}
router.get("/", async (req, res) => {
	try {
		res.render("search");
	} catch (e) {
		res.status(404).json(e);
	}
});
router.get("/show/:id", async (req, res) => {
	try {
		const showId = req.params.id;
		const shows = await getShows();
		for (let i = 0; i < shows.length; i++) {
			if (shows[i].id.toString() === showId) {
				res.render("showDetails", { show: shows[showId] });
				break;
			}
		}
	} catch (e) {
		res.status(404).json(e);
	}
});
router.post("/", async (req, res) => {
	let searchParams = req.body["search-key"];
	res.redirect(`/searchshows/${searchParams}`);
});
router.get("/searchshows/:searchParams", async (req, res) => {
	try {
		const search = req.params.searchParams;
		const shows = await searchShows(search);
		let showArr = [];
		for (let i = 0; i < 5; i++) {
			console.log(shows[i]);
			showArr.push(shows[i]);
		}
		res.render("shows", { shows: showArr });
	} catch (e) {
		res.status(404).json(e);
	}
});
module.exports = router;
