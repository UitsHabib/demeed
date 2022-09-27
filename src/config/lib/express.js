const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("../index");
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

module.exports = () => {
	const app = express();

	app.use(cookieParser(nodeCache.getValue("COOKIE_SECRET")));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.set("port", nodeCache.getValue("PORT"));

	const globalConfig = config.getGlobalConfig();

	globalConfig.routes.forEach((routePath) => {
		require(path.resolve(routePath))(app);
	});

	globalConfig.strategies.forEach((strategyPath) => {
		require(path.resolve(strategyPath))();
	});

	return app;
};
