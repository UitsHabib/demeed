const {
  signUp,
  login,
  logout,
  getSignedInAdminProfile,
} = require("./admin.controller.js");
const validate = require("../core/middlewares/validator.middleware.js");
const { registerSchema, loginSchema } = require("./admin.schema.js");
const AdminStrategy = require("./admin.authentication.middleware.js");

module.exports = (app) => {
  app.post("/api/admins/register", validate(registerSchema), signUp);
  app.post("/api/admins/login", validate(loginSchema), login);
  app.get("/api/admins/profile", AdminStrategy, getSignedInAdminProfile);
  app.post("/api/admins/logout", logout);
};
