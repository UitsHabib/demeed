const { signUp, login, getMerchantProfile } = require("./merchant.controller");
const validate = require("../core/middlewares/validator.middleware");
const { signUpSchema, loginSchema } = require("./merchant.schema");
const MerchantStrategy = require("./merchant.authentication.middleware");
module.exports = (app) => {
  app.post("/api/merchants/register", validate(signUpSchema), signUp);
  app.post("/api/merchants/login", validate(loginSchema), login);
  app.get("/api/merchants/profile", MerchantStrategy, getMerchantProfile);
};
