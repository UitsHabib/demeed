const { signUp, login, getLoginProfile, logout } = require("./user.controller");
const validate = require("../core/middlewares/validator.middleware");
const { registerSchema, loginSchema } = require("./user.schema");
const UserStrategy = require("./user.authentication.middleware");

module.exports = (app) => {
  app.post("/api/users/registration", validate(registerSchema), signUp);
  app.post("/api/users/login", validate( loginSchema), login);
  app.get("/api/users/profile", UserStrategy, getLoginProfile);
  app.post("/api/users/logout", logout);
};
