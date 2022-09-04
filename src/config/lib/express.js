const path = require('path');
const express = require('express');
const config = require('../index.js');
const cookieparser = require("cookie-parser");


module.exports = function (){
    const app= express();

    app.use(express.json());
    app.use(cookieparser("cookie-secret"));


    const globalConfig = config.getGlobalConfig();
    globalConfig.routes.forEach((routePath) => {
        require(path.resolve(routePath))(app);
    });


    return(app);
    };