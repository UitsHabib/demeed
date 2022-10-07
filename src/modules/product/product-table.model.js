const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");
const Merchant = require(path.join(process.cwd(), "src/modules/merchant/merchant.model"));

const Product = sequelize.define(
	"products",
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
        price: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		description: {
			allowNull: true,
			type: DataTypes.STRING,
		},
        discount: {
			allowNull: false,
			type: DataTypes.STRING,
		},
        stock_quantity: {
            allowNull: false,
			type: DataTypes.STRING,
        },
		type: {
			type: DataTypes.ENUM("custom", "standard"),
			defaultValue: "custom",
		},
		created_by: {
			type: DataTypes.UUID,
		},
		updated_by: {
			type: DataTypes.UUID,
		},
	},
	{
		tableName: "products",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

Product.hasMany(Merchant, { as: "add_products", foreignKey: "merchant_id" });

module.exports = Product;
