const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const { engine } = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

configRoutes(app);

app.listen(3000, () => {
	console.log("server started");
	console.log("Your routes are running on http://localhost:3000");
});
