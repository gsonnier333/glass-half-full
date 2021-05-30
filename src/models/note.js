module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define("Note", {
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		userNotes: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	return Note;
};
