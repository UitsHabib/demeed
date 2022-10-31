const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");
const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));
const File = require(path.join(process.cwd(), "src/modules/core/storage/file.model"));

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

User.belongsTo(Profile, { as: "profile", foreignKey: "profile_id", constraints: false });

module.exports = User;
