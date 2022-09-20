const {
    signIn,
    signUp,
    adminForgotPassword,
    adminResetPassword,
    getSignedInUser
  } = require("./admin.controller");
const validateSchema = require("../core/validate.middleware");
const AdminStrategy = require("./admin.authenticate.middleware");
const {loginSchema,registerSchema} = require("./admin.schema");

module.exports = (app) => {
  app.post("/admins/signin", validateSchema(loginSchema), signIn);

  app.post("/admins/signup", validateSchema(registerSchema), signUp);

  app.post("/admins/forgot-password", adminForgotPassword);

  app.post("/admins/reset-password", adminResetPassword);
  
  app.get("/admins/profile", AdminStrategy, getSignedInUser);
};