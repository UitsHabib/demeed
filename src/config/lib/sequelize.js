require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize("blog", DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: "mysql",
	logging: false,
	sync: true,
});

module.exports = sequelize;
