const {
    adminSignIn,
    adminSignUp,
    adminForgotPassword,
    adminResetPassword,
  } = require("./admin.controller");
  
  module.exports = (app) => {
    app.post("/admin/signin", adminSignIn);
  
    app.post("/admin/signup", adminSignUp);
  
    app.post("/admin/forgot-password", adminForgotPassword);
  
    app.post("/admin/reset-password", adminResetPassword);
  };