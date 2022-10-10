const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");

const Customer = sequelize.define(
	"customers",
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		profile_image_url: {
			//allowNull: false,
			type: DataTypes.STRING,
		},
		profile_image_public_id: {
			//allowNull: false,
			type: DataTypes.STRING,
		},
		created_by: {
			type: DataTypes.UUID,
		},
		updated_by: {
			type: DataTypes.UUID,
		},
	},
	{
		tableName: "customers",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Customer;
