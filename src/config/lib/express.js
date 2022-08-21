const path = require("path");
const express = require("express");
const config = require("../index");
const cookieParser = require("cookie-parser");

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser("cookie-secret"));

  const globalConfig = config.getGlobalConfig();

  globalConfig.routes.forEach((routePath) => {
    require(path.resolve(routePath))(app);
  });

  return app;
};