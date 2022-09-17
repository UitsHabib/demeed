const { createPermission } = require("./permission.controller");

const UserStrategy = require("../user/user.authentication.middleware");

module.exports = (app) => {
  app.post("/api/permissions", UserStrategy, createPermission);
};
