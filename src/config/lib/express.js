const path = require("path");
const config = require("../index.js");

module.exports = () => {
  const express = require("express");
  const app = express();
  app.use(express.json());

  const globalConfig = config.getGlobalConfig();

  globalConfig.routes.forEach((routePath) => {
    require(path.resolve(routePath))(app);
  });

  return app;
};
