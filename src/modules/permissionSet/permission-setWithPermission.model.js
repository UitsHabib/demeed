const path = require("path");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");
const PermissionSet = require("./permission-set.model");
const Permission = require("../permission/permission.model");

const PermissionSetWithPermission = sequelize.define(
    "permission_set_with_permissions",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        permissionSet_id: {
            allowNull: false,
            type: DataTypes.UUID
        },
        permission_id: {
            allowNull: false,
            type: DataTypes.UUID
        },
    },
    {
        tableName: "permission_set_with_permissions",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

PermissionSet.hasMany(PermissionSetWithPermission, { as: "permission_set_with_permission", foreignKey: "permissionSet_id" });
PermissionSetWithPermission.belongsTo(Permission, { as: "permission", foreignKey: "permission_id"});

module.exports = PermissionSetWithPermission;