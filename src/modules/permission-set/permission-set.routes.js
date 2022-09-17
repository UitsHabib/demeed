const { createPermissionSet } = require("./permission-set.controller");

module.exports = (app) => {
  app.post("/api/permission-set", createPermissionSet);
};
