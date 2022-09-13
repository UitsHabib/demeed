const path = require("path");
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));
const { DataTypes } = require("sequelize");

const Entity = sequelize.define(
  "entities",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    users: {
      type: DataTypes.STRING,
    },
    permissions: {
      type: DataTypes.STRING,
    },
    profile: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "entities",
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Entity;