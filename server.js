const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

console.log(__dirname);

const db = require("./src/models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("build"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/build/index.html"));
});

require("./src/routes/note-routes.js")(app);

db.sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
