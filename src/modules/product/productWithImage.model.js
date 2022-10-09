const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");
// const Merchant = require(path.join(process.cwd(), "src/modules/merchant/merchant.model"));

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
			allowNull: false,
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
		tableName: "images",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);


module.exports = Image;
