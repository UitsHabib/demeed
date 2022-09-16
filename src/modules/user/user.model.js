const path = require("path");
const sequelize = require(path.join(process.cwd(),"/src/config/lib/sequelize"));

const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    createdAt: "created_at",
    updateAt: "updated_at",
  }
);

module.exports = User;
