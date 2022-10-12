const path = require("path");
const { DataTypes } = require("sequelize");
const Service = require("../service/service.model");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));

const User = sequelize.define(
	"users",
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
		profile_id: {
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
		tableName: "users",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

User.belongsTo(User, { as: "createdByUser", foreignKey: "created_by" });
User.belongsTo(User, { as: "updatedByUser", foreignKey: "updated_by" });
User.belongsTo(Profile, { as: "profile", foreignKey: "profile_id", constraints: false });

module.exports = User;