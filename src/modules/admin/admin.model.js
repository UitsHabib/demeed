const path =  require('path');
const sequelize = require(path.join(process.cwd(), '/src/config/lib/sequelize'));

const { DataTypes } = require('sequelize');

const Admin = sequelize.define('admin', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    }
}, {
    tableName: 'admin',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Admin