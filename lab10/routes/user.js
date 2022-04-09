const express = require("express");
const userApi = require("../data/users");
const router = express.Router();
router.route("/").get(async (req, res) => {
	try {
		let result = userApi.createUser("hi", "bye");
		res.json(result);
	} catch (e) {
		res.status(404).json(e);
	}
});
router.route("/signup").get(async (req, res) => {});
router.route("/signup").post(async (req, res) => {});
router.route("/login").post(async (req, res) => {});
router.route("/private").get(async (req, res) => {});
router.route("/logout").get(async (req, res) => {});
module.exports = router;
