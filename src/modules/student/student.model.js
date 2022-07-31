const path = require("path");
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/sequelize.js"
));
const { DataTypes } = require("sequelize");

const Student = sequelize.define(
  "students",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    roll: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "students",
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Student;
