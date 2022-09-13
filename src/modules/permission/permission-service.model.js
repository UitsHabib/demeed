const path = require("path");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");
const Permission = require("./permission.model");
const Service = require("../service/service.model");

const PermissionService = sequelize.define("permission_services", {
    id: {
        allowNull: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    permission_id: {
        allowNull: false,
        type: DataTypes.UUID
    },
    service_id: {
        allowNull: false,
        type: DataTypes.UUID
    }
},
{
    tableName: "permission_services",
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Permission.hasMany(PermissionService, { as: "permission_services", foreignKey: "permission_id" });
PermissionService.belongsTo(Service, { as: "service", foreignKey: "service_id" });

module.exports = PermissionService;