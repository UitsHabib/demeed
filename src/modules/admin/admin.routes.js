const {
  registerAdmin,
  adminSignIn,
  passwordReset,
} = require("./admin.controller.js");

module.exports = (app) => {
  app.post("/admin/register", registerAdmin);
  app.post("/admin/signin", adminSignIn);
  app.post("/admin/password/reset", passwordReset);
};
