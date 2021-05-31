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
				res.json(err);
			});
	});

	app.get("/api/notes/:id", (req, res) => {
		db.Note.findAll({
			attributes: ["userNotes"],
			where: { userId: req.params.id },
		})
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json(err);
			});
	});

	app.post("/api/notes", (req, res) => {
		db.Note.update(
			{ userNotes: req.body.note },
			{
				where: { userId: req.body.userId },
			}
		);
	});
};
