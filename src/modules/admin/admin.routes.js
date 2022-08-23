const {
  registerAdmin,
  login,
  passwordReset,
} = require("./admin.controller.js");

module.exports = (app) => {
  app.post("/admin/register", registerAdmin);
  app.post("/admin/login", login);
  app.post("/admin/password/reset", passwordReset);
};
