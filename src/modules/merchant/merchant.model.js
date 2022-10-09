const path = require("path");

const { DataTypes } = require("sequelize");

const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const Product = require(path.join(process.cwd(), "src/modules/product/product.model.js"));

const Merchant = sequelize.define(
	"merchants",
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		}
	},
	{
		tableName: "merchants",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

Merchant.hasMany(Product, { as: "merchant", foreignKey: "id", constraints: false });

module.exports = Merchant;