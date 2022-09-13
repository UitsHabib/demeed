const path = require("path")
const sequlize = require(path.join(process.cwd(), "src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize")

const Service = sequlize.define("services", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING
    }
},
{
    tableName: "services",
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Service;