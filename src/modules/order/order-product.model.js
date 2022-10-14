const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));

const OrderProduct = sequelize.define("order_products", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    order_id: {
        allowNull: false,
        type: DataTypes.UUID
    },
    product_id: {
        allowNull: false,
        type: DataTypes.UUID
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2)
    }
},
{
    tableName: "order_products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

module.exports = OrderProduct;