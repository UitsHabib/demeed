const express = require("express");
const path = require("path");
const config = require("../index");

module.exports = () => {
    const app = express();

    app.use(express.json());

    const globalConfig = config.getGlobalConfig();

    globalConfig.routes.forEach(routePath => {
        require(path.resolve(routePath))(app);
    })

    return app;
};