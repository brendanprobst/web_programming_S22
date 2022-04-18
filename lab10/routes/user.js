const express = require("express");
const { reset } = require("nodemon");
const userApi = require("../data/users");
const router = express.Router();
router.route("/").get(async (req, res) => {
	try {
		res.render("login");
	} catch (e) {
		res.status(404).json(e);
	}
});
router.route("/signup").get(async (req, res) => {
	try {
		res.render("signup");
	} catch (e) {
		console.log(e);
	}
});
router.route("/signup").post(async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		const signUpSuccessful = await userApi.createUser(username, password);
		if (signUpSuccessful.authorized !== null) {
			res.redirect("/");
		}
	} catch (e) {
		res.status(404).json(e);
	}
});
router.route("/login").post(async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		const logInSuccessful = await userApi.checkUser(username, password);
		if (logInSuccessful) {
			req.session.user = username;
			res.redirect("/private");
		}
	} catch (e) {
		res.status(404).json(e);
	}
});
router.route("/private").get(async (req, res) => {
	if (req.session.user) {
		console.log(
			"[" +
				new Date().toUTCString() +
				"]: " +
				req.method +
				" " +
				req.originalUrl +
				" (Authenticated User)"
		);
		res.render("private", { username: req.session.user });
	} else {
		console.log(
			"[" +
				new Date().toUTCString() +
				"]: " +
				req.method +
				" " +
				req.originalUrl +
				" (NOT Authenticated User)"
		);
	}
});
router.route("/logout").get(async (req, res) => {
	res.clearCookie("AuthCookie");
	res.render("logout");
});
module.exports = router;
