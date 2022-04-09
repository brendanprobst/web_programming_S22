const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		// console.log("working");
		res.render("prime");
	} catch (e) {
		res.json(e);
	}
});
module.exports = router;
