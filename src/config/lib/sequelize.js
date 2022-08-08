const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    sync: true,
})

module.exports = sequelize;