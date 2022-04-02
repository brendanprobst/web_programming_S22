const showRoutes = require("./shows");

const constructorMethod = (app) => {
	app.use("/", showRoutes);
	app.use("*", (req, res) => {
		res.render("error", { class: "error", error: "URL NOT FOUND" });
	});
};
module.exports = constructorMethod;
