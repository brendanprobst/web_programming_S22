const express = require("express");
const path = require("path");
const app = express();

app.get("/", async (req, res) => {
	try {
		res.sendFile(path.join(__dirname + "/index.html"));
	} catch (e) {
		res.render("error", { error: e });
	}
});
app.get("*", async (req, res) => {
	res.redirect("/");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
	console.log("server running at http://localhost:3000");
});
