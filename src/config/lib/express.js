const path = require("path");
const express = require("express");
const config = require("../index");
<<<<<<< HEAD
const cookieParser = require("cookie-parser");

module.exports = () => {
=======
const cookieParser = require("cookie-parser")

module.exports = () => {

>>>>>>> d913a46 (Add create Permission)
  const app = express();

  app.use(express.json());
  app.use(cookieParser("cookie-secret"));

  const globalConfig = config.getGlobalConfig();

  globalConfig.routes.forEach((routePath) => {
    require(path.resolve(routePath))(app);
  });

  globalConfig.strategies.forEach((strategyPath) => {
    require(path.resolve(strategyPath))();
  });

  return app;
};
