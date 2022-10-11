const path = require("path");
<<<<<<< HEAD
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const Permission = require(path.join(process.cwd(), "src/modules/platform/permission/permission.model"));
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
);

ProfilePermission.belongsTo(Permission, { as: "permission", foreignKey: "permission_id" });

module.exports = ProfilePermission;
=======
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize"));
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
    updateAt: "updated_at",
  }
);

module.exports = ProfilePermission;
>>>>>>> a758611 (Add All model)
