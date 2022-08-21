const path = require('path');
const express = require("express");
const config = require("../index");

module.exports = () => {
  const app = express();
  
  app.use(express.json());

  const globalConfig = config.getGlobalConfig();
  
  globalConfig.routes.forEach((routePath) => {
    require(path.resolve(routePath))(app);
  });

  return app
};
