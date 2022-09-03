const path = require('path');

const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize.js'));
const { DataTypes } = require('sequelize')

const DelivaryMan = sequelize.define('delivaryMan', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'delivaryMan',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = DelivaryMan;