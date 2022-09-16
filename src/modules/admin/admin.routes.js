const {
  getLoginProfile,
  login,
  signUp,
  logout,
} = require("./admin.controller");
const validate = require("../core/middlewares/validator.middleware");
const { registerSchema, loginSchema } = require("./admin.schema");
const AdminStrategy = require("./admin.authentication.middleware");


module.exports = (app) => {
  app.post("/api/admins/registration", validate(registerSchema), signUp);
  app.post("/api/admins/login", validate(loginSchema), login);
  app.get("/api/admins/profile", AdminStrategy, getLoginProfile);
  app.post("/api/admins/logout", logout);
};
