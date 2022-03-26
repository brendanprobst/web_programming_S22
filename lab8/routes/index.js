const showRoutes = require("./shows");

const constructorMethod = (app) => {
	app.use("/", showRoutes);
	app.use("*", (req, res) => {
		res.redirect("/");
	});
};
module.exports = constructorMethod;
