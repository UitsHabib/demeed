const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const config = require("../index");

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser("cookie_secret"));

    const globalConfig = config.getGlobalConfig();

    globalConfig.routes.forEach(routePath => {
        require(path.resolve(routePath))(app);
    });

    globalConfig.strategies.forEach(strategyPath => {
        require(path.resolve(strategyPath))(app);
    });

    return app;
};