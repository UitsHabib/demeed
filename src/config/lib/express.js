const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require(path.join(process.cwd(), 'src/config/index.js'));
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

module.exports = () => {
	const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

	app.use(cookieParser(nodeCache.getValue("COOKIE_SECRET")));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            return callback(null, true);

            callback(new Error('Not allowed by CORS'));
        }
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
