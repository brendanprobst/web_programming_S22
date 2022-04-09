const primeRoutes = require("./prime");

const constructorMethod = (app) => {
	app.use("/", primeRoutes);
	app.use("*", (req, res) => {
		res.render("error", { class: "error", error: "URL NOT FOUND" });
	});
};
module.exports = constructorMethod;
