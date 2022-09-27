const path = require('path');

const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize.js'));
const { DataTypes } = require('sequelize')

const PermissionSet = sequelize.define('permission_set', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    permissions: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'permission_set',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = PermissionSet;