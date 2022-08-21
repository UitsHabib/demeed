const path = require('path');
const sequelize = require(path.join(process.cwd(), '/src/config/lib/sequelize.js'));
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
   
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
