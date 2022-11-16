const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize.js"));

const Permission = sequelize.define(
  "permissions",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
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
    tableName: "Permissions",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Permission;
