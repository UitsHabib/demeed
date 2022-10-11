const path = require("path");
const express = require("express");
<<<<<<< HEAD
=======
const config = require("../index");
<<<<<<< HEAD
>>>>>>> b4a7084 (Reslove Conflict Marge-2)
const cookieParser = require("cookie-parser");
const cors = require('cors');
const config = require("../index");
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

module.exports = () => {
<<<<<<< HEAD
	const app = express();

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
=======
=======
const cookieParser = require("cookie-parser")

module.exports = () => {

>>>>>>> d913a46 (Add create Permission)
  const app = express();
>>>>>>> b4a7084 (Reslove Conflict Marge-2)

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
