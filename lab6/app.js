const bodyParser = require("body-parser");
const express = require("express");
const router = require("./routes");
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.listen(port, () => {
	console.log(`Server Started: running on http://localhost:${port}`);
	console.log("====================================================");
});
