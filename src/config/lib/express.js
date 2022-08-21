const express = require("express");
const path = require("path");
const config = require("../index");

module.exports = () => {
    const app = express();

    app.use(express.json());

    const globalCongig = config.getGlobalConfig();

    globalCongig.routes.forEach(routePaht => {
        require(path.resolve(routePaht))(app);
    });

    return app;
};