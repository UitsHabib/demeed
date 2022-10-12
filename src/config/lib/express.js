const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
<<<<<<< HEAD
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require(path.join(process.cwd(), "src/config/index.js"));
=======
const cors = require("cors");
const config = require("../index");
>>>>>>> 7e9e38e (Resolve Conflict)
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));
const { cloudinaryConfig } = require(path.join(process.cwd(), "src/config/lib/cloudinaryConfig"));

module.exports = () => {
	const app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(cookieParser(nodeCache.getValue("COOKIE_SECRET")));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use("*", cloudinaryConfig);

	const corsOptions = {
		credentials: true,
		origin: (origin, callback) => {
			return callback(null, true);

			callback(new Error("Not allowed by CORS"));
		},
	};
	app.use(cors(corsOptions));

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
