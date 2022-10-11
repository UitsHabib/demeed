const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model.js"));

const Cart = sequelize.define(
  "carts",
  {
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
  },
  {
    tableName: "carts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.hasOne(Cart, { as: "cart", foreignKey: "customer_id" });
Cart.belongsTo(User, { as: "cart", foreignKey: "customer_id" });

module.exports = Cart;
