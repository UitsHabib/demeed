const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));
const Cart = require(path.join(process.cwd(), "/src/modules/cart/cart.model"));

const Order = sequelize.define("orders",{
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    customer_id: {
        allowNull: false,
        type: DataTypes.UUID,
    },
    cart_id: {
        allowNull: false,
        type: DataTypes.UUID
    },
    status: {
        type: DataTypes.ENUM,
        values: ["confirmed", "pending"],
        defaultValue: "pending",
    },
    delivery_status: {
        type: DataTypes.ENUM,
        values: ["failed", "processing", "process-pending", "success"],
        defaultValue: "process-pending"
    },
    shipment_date: {
        type: DataTypes.STRING,
    },
},
{
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

Order.belongsTo(Cart, { as: "cart", foreignKey: "cart_id"})

module.exports = Order;
