const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");
const ProfilePermission = require(path.join(process.cwd(), "src/modules/permission/profile-permission.model"));

const Profile = sequelize.define(
<<<<<<< HEAD
	"profiles",
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		description: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.ENUM("custom", "standard"),
			defaultValue: "custom",
		},
		created_by: {
			type: DataTypes.UUID,
		},
		updated_by: {
			type: DataTypes.UUID,
		},
	},
	{
		tableName: "profiles",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
=======
  "profiles",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM("custom", "standard"),
      defaultValue: "custom",
    },
    created_by: {
      type: DataTypes.UUID,
    },
    updated_by: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "profiles",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
>>>>>>> Add Service Guard Feature
);

Profile.hasMany(ProfilePermission, { as: "profile_permissions", foreignKey: "profile_id" });

module.exports = Profile;
