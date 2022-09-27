const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("deemed", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  sync: true,
});

module.exports = sequelize;
