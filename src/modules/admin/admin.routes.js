const {
  signUp,
  login,
  logout,
  getSignedInUserProfile,
} = require("./admin.controller.js");
const validate = require("../core/middlewares/validator.middleware.js");
const { registerSchema } = require("./admin.schema.js");

module.exports = (app) => {
  app.post("/api/admins/register", validate(registerSchema), signUp);
  app.post("/api/admins/login", login);
  app.get("/api/admins/profile", getSignedInUserProfile);
  app.post("/api/admins/logout", logout);
};
