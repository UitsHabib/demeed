const path = require("path");
const Permission = require("../permission/permission.model")
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));


const { DataTypes } = require("sequelize");

const Service = sequelize.define(
  "services",
  {
    id: {
      // allowNull: false,
      primaryKey: true,
      // type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV4,
      type:DataTypes.INTEGER,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "services",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Service;