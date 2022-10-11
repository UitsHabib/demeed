const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");
const Cart = require(path.join(process.cwd(), "src/modules/cart/cart.model.js"));

const CartItem = sequelize.define(
  "cart_items",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    cart_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    product_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },

    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "cart_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Cart.hasMany(CartItem, { as: "cartItems", foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { as: "cartItems", foreignKey: "cart_id" });

module.exports = CartItem;
