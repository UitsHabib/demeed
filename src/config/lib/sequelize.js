const path = require("path");
const { Sequelize } = require("sequelize");
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

const DB_HOST = nodeCache.getValue("DB_HOST");
const DB_USER = nodeCache.getValue("DB_USER");
const DB_PASSWORD = nodeCache.getValue("DB_PASSWORD");

const sequelize = new Sequelize("blog", DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: "mysql",
	logging: false,
	sync: true,
});

module.exports = sequelize;
