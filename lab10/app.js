const express = require("express");
const app = express();
const configRoutes = require("./routes");
configRoutes(app);
app.use(
	session({
		name: "AuthCookie",
		secret: "some secret string!",
		resave: false,
		saveUninitialized: true,
	})
);
app.listen(3000, () => {
	console.log("Server Started");
	console.log("Your routes will be running on http://localhost:3000");
});
