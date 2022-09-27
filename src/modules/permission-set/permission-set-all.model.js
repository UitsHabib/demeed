const path = require("path");
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));
const { DataTypes } = require("sequelize");
const Permission = require("../permission/permission.model");
const PermissionSet = require("./permission-set.model");

const PermissionSetAll = sequelize.define(
  "permission_sets_all",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    permission_set_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    permission_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },

  {
    tableName: "permission_sets_all",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
PermissionSet.hasMany(PermissionSetAll, {
  as: "permission_sets_all",
  foreignKey: "permission_set_id",
});
PermissionSetAll.belongsTo(Permission, {
  as: "permissions",
  foreignKey: "permission_id",
});
module.exports = PermissionSetAll;
