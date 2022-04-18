const express = require("express");
const session = require("express-session");
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
const { engine } = require("express-handlebars");
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(
	session({
		name: "AuthCookie",
		secret: "some secret string!",
		resave: false,
		saveUninitialized: true,
	})
);
app.use("/private", (req, res, next) => {
	console.log(req.session.id);
	if (!req.session.user) {
		return res.redirect("/");
	} else {
		next();
	}
});

configRoutes(app);
app.listen(3000, () => {
	console.log("Server Started");
	console.log("Your routes will be running on http://localhost:3000");
});
