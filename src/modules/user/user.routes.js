<<<<<<< HEAD
const {
  login,
  signUp,
  getSignedInUserProfile,
  logout,
  setProfile,
  deleteUser,
} = require("./user.controller");
const { registerSchema, loginSchema } = require("./user.schema");
const validate = require("../core/middlewares/validate.middleware");
const UserStrategy = require("./user.authentication.middleware");
const PermissionStrategy = require("./user.permission.middleware");

module.exports = (app) => {
  app.post("/api/users/login/", validate(loginSchema), login);

  app.post("/api/users/signup/", validate(registerSchema), signUp);

  app.get("/api/users/profile", UserStrategy, getSignedInUserProfile);

  app.post("/api/users/logout", logout);

  app.patch("/api/users/profile", setProfile);

  app.delete("/api/user", UserStrategy, PermissionStrategy(19), deleteUser);
=======
const { signUp, login, logout, getSignedInUserProfile } = require("./user.controller.js");
const validate = require("../core/middlewares/validator.middleware.js");
const { registerSchema, loginSchema } = require("./user.schema.js");
const UserStrategy = require("./user.authentication.middleware.js");

module.exports = (app) => {
  app.post("/api/users/signup", validate(registerSchema), signUp);
  app.post("/api/users/login", validate(loginSchema), login);
  app.get("/api/users/profile", UserStrategy, getSignedInUserProfile);
  app.post("/api/users/logout", logout);
>>>>>>> Add Service Guard Feature
};
