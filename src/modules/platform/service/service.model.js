const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

const Service = sequelize.define(
	"services",
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING(50),
		},
		slug: {
			allowNull: false,
			type: DataTypes.STRING(100),
		},
		parent_id: {
			allowNull: true,
			type: DataTypes.UUID,
		},
		created_by: {
			type: DataTypes.UUID,
		},
		updated_by: {
			type: DataTypes.UUID,
		},
	},
	{
		tableName: "services",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Service;
