const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const config = require("../index");

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser("cookie_secret"));

    const globalCongig = config.getGlobalConfig();

    globalCongig.routes.forEach(routePaht => {
        require(path.resolve(routePaht))(app);
    });

    return app;
};