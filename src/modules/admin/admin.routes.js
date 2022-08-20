const { registerAdmin, adminSignIn } = require("./admin.controller.js");

module.exports = (app) => {
  app.post("/admin/register", registerAdmin);
  app.post("/admin/signin", adminSignIn);
};
