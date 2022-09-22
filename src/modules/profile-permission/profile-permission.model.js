const path = require("path");
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));
const Permission = require("../permission/permission.model");
const Profile = require("../profile/profile.model");
const { DataTypes } = require("sequelize");

const ProfilePermission = sequelize.define(
  "permission-services",
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
    created_by: {
      type: DataTypes.UUID,
    },
    updated_by: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "ProfilePermissions",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

PermissionService.hasMany(Profile, {
  as: "profile-permission",
  foreignKey: "profile_id",
});
ProfilePermission.belongsTo(Permissions, {
  as: "permission",
  foreignKey: "permission_id",
});

module.exports = ProfilePermission;
