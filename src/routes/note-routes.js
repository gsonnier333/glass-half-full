const db = require("../models");

module.exports = (app) => {
	app.post("/api/newUser", (req, res) => {
		db.Note.create({
			userId: req.body.userId,
			userNotes: "",
		})
			.then(() => {
				console.log(
					`New user notes created for userId ${req.body.userId}`
				);
			})
			.catch((err) => {
				console.log("Error adding new user notes");
				console.log(err);
			});
	});

	app.get("/api/allUsers", (req, res) => {
		db.Note.findAll({
			attributes: ["userId"],
		})
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	});
};
