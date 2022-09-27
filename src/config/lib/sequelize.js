const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("deemed", "root", "#@!admin123456", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  sync: true,
});

module.exports = sequelize;
