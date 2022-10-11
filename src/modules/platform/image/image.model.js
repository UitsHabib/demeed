const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");

const Image = sequelize.define(
	"images",
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		url: {
			type: DataTypes.STRING,
		},
		public_id: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "images",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Image;
