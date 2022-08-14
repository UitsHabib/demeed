const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    port: '3306',
    password: '',
    database: 'test_blog',
    dialect: 'mysql',
    logging: false,
    sync: true,
});

module.exports = sequelize;