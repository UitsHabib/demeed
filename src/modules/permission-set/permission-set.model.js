const path = require("path");
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));
const { DataTypes } = require("sequelize");
const Permission = require("../permission/permission.model");
const PermissionSet = sequelize.define(
  "permission_sets",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
  },

  {
    tableName: "permission_sets",
    timestamps: false,
  }
);

PermissionSet.belongsToMany(Permission, {
  as: "Permissions",
  through: "permissions_set_all",
  timestamps: false,
});
module.exports = PermissionSet;
