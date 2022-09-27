const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const Service = require(path.join(process.cwd(), "src/modules/service/service.model"));
const Permission = require(path.join(process.cwd(), "src/modules/permission/permission.model"));

const PermissionService = sequelize.define(
	"permission_services",
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
		tableName: "permission_services",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

Permission.hasMany(PermissionService, { as: "permission_services", foreignKey: "permission_id" });
PermissionService.belongsTo(Service, { as: "service", foreignKey: "service_id" });

module.exports = PermissionService;
