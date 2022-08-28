const {
  login,
  signUp,
  adminForgotPassword,
  adminResetPassword,
  getSignedInUserProfile,
  logout,
} = require("./admin.controller");
const { registerSchema } = require("./register.schema");
const validate = require("../core/middlewares/validate.middleware");

module.exports = (app) => {
  app.post("api/admin/signin/", login);

  app.post("/api/admins/signup/", validate(registerSchema), signUp);

  app.post("api/admin/forgot-password", adminForgotPassword);

  app.post("api/admin/reset-password", adminResetPassword);

  app.get("/api/users/profile", getSignedInUserProfile);

  app.post("/api/logout", logout);
};
