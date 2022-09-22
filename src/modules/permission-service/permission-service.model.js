const path = require("path");
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));
const { DataTypes } = require("sequelize");

const PermissionService = sequelize.define(
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
    service_id: {
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
    tableName: "PermissionServices",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Permission.hasMany(PermissionService, {
  as: "permission_service",
  foreignKey: "permission_id",
});
PermissionService.belongsTo(Service, {
  as: "service",
  foreignKey: "service_id",
});

module.exports = PermissionService;
