const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
<<<<<<< HEAD
const Permission = require(path.join(process.cwd(), "src/modules/permission/permission.model"));
const { DataTypes } = require("sequelize");

const ProfilePermission = sequelize.define(
	"profile_permissions",
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		permission_id: {
			allowNull: false,
			type: DataTypes.UUID,
		},
		profile_id: {
			allowNull: false,
			type: DataTypes.UUID,
		},
	},
	{
		tableName: "profile_permissions",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
=======
const { DataTypes } = require("sequelize");

const Permission = require(path.join(process.cwd(), "src/modules/permission/permission.model"));

const ProfilePermission = sequelize.define(
  "profile_permissions",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    permission_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    profile_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "profile_permissions",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
>>>>>>> Add Service Guard Feature
);

ProfilePermission.belongsTo(Permission, { as: "permission", foreignKey: "permission_id" });

module.exports = ProfilePermission;
