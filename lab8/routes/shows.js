const express = require("express");
const axios = require("axios");
const router = express.Router();
function isValidId(id) {
	if (typeof id !== "string") {
		throw "ERROR: invalid Show Id";
	}

	const numId = Number(id);

	if (Number.isInteger(numId) && numId > 0) {
		return true;
	}

	throw "ERROR: Show Id must be a number greater than 0";
}
function removeHTML(string) {
	if (typeof string !== "string") throw "ERROR: Invalid summary";
	return string.replace(/(<([^>]+)>)/gi, "");
}
async function getShowById(id) {
	const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);
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
		res.render("error", { error: e });
	}
});
router.get("/show/:id", async (req, res) => {
	try {
		const showId = req.params.id;
		isValidId(showId);
		const show = await getShowById(showId);
		console.log("show", show);
		let name = "N/A";
		let picture =
			"https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
		let language = "N/A";
		let genres = ["N/A"];
		let rating = "N/A";
		let network = "N/A";
		let summary = "N/A";
		if (show.name !== null) name = show.name;
		if (show.image !== null) picture = show.image.medium;
		if (show.language !== null) language = show.language;
		if (show.genres.length > 0) genres = show.genres;
		if (show.rating.average !== null) rating = show.rating.average;
		if (show.network.name !== null) network = show.network.name;
		if (show.summary !== null) summary = removeHTML(show.summary);
		//TODO: ^strip html tags
		res.render("showDetails", {
			name: name,
			picture: picture,
			language: language,
			genres: genres,
			rating: rating,
			network: network,
			summary: summary,
		});
	} catch (e) {
		res.render("error", { error: e, class: "error" });
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
		let arrLength = shows.length;
		if (shows.length > 5) arrLength = 5;
		if (shows.length === 0) {
			res.render("error", {
				class: "show-not-found",
				error: `We're sorry, but no results were found for "${search}"`,
			});
		}
		let showArr = [];
		for (let i = 0; i < arrLength; i++) {
			console.log(shows[i]);
			showArr.push(shows[i]);
		}
		res.render("shows", { shows: showArr });
	} catch (e) {
		res.status(404).json(e);
	}
});
module.exports = router;
