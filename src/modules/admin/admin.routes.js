const {
  login,
  signUp,
  adminForgotPassword,
  adminResetPassword,
  getSignedInUserProfile,
  logout,
} = require("./admin.controller");
const { registerSchema, loginSchema } = require("./admin.schema");
const validate = require("../core/middlewares/validate.middleware");
const AdminStrategy = require("./admin.authentication.middleware");

module.exports = (app) => {
  app.post("/api/admins/login/", validate(loginSchema), login);

  app.post("/api/admins/signup/", validate(registerSchema), signUp);

  app.post("/api/admins/forgot-password", adminForgotPassword);

  app.post("/api/admins/reset-password", adminResetPassword);

  app.get("/api/admins/profile", AdminStrategy, getSignedInUserProfile);

  app.post("/api/admins/logout", logout);
};
