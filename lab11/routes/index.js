const constructorMethod = (app) => {
	app.get("/", function (req, res) {
		res.render("home");
	});

	app.use("*", (req, res) => {
		res.sendStatus(404);
	});
};

module.exports = constructorMethod;
