const { Sequelize } = require('sequelize');

const server = new Sequelize('deneeds', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = server;