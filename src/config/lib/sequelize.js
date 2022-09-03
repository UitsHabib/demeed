const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('project', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
    logging: false,
    sync: true
})

module.exports = sequelize;