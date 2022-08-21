module.exports = () => {
    const express = require('express');
    const config = require("../index");
    const path = require("path");

    const app = express();

    app.use(express.json());

    const globalConfig = config.getGlobalConfig();
  
    globalConfig.routes.forEach((routePath) => {
        require(path.resolve(routePath))(app);
    });

    return app;
}