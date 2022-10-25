const path = require("path");
const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");

const File = sequelize.define("files", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(224),
    },
    owner_id: {
        type: DataTypes.UUID,
    },
    table_name: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["products", "users"]
    },
    created_by: {
        type: DataTypes.UUID,
    },
    updated_by: {
        type: DataTypes.UUID,
    },
},
{
    tableName: "files",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

module.exports = File;
