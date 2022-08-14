const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blog", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    sync: true
});


module.exports = sequelize;
