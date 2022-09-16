const express = require("express");
const config = require("../index");

module.exports = () => {
    const app = express();

    app.use(express.json());

    const globalConfig = config.getGlobalConfig();

    //here write your getGlobalCongig property.

    return app;
};