
const {
  signUp,
  login,
  getLoginProfile,
  logout,
} = require("./merchant.controller");

const validate = require("../core/middlewares/validator.middleware");
const { registerSchema, loginSchema } = require("./merchant.schema")

module.exports = (app) => {
  app.post("/api/merchants/registration", validate(registerSchema),  signUp);
  app.post("/api/merchants/login", validate(loginSchema), login);
  app.get("/api/merchants/profile", getLoginProfile);
  app.post("/api/merchants/logout", logout);
};
