const {
  login,
  adminSignUp,
  adminForgotPassword,
  adminResetPassword,
  getSignedInUserProfile,
  logout,
} = require("./admin.controller");

module.exports = (app) => {
  app.post("/admin/signin/", login);

  app.post("/admin/signup/", adminSignUp);

  app.post("/admin/forgot-password", adminForgotPassword);

  app.post("/admin/reset-password", adminResetPassword);

  app.get("/api/users/profile", getSignedInUserProfile);

  app.post("/api/logout", logout);
};
