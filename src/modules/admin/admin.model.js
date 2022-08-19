const path = require("path");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));

const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
  "admins",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "admins",
    timestamps: false,
    createdAt: "created_at",
    updateAt: "updated_at",
  }
);

module.exports = Admin;
