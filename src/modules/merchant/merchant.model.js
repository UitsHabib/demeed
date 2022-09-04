const path = require("path");
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));
const { DataTypes } = require("sequelize");

const Merchant = sequelize.define(
  "merchants",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    merchantAge: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { tableName: "merchants", timestamps: false }
);

module.exports = Merchant;
