const path = require("path");
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));
//const Permission = require("./permission.model");
const Profile = require("../profile/profile.model");
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
    }
  },
  {
    tableName: "profile_permissions",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

/*PermissionService.hasMany(Profile, {
  as: "profile-permission",
  foreignKey: "profile_id",
});
ProfilePermission.belongsTo(Permissions, {
  as: "permission",
  foreignKey: "permission_id",
});*/

module.exports = ProfilePermission;
