const { getMerchants, login, signup, logout, getSinginMerchentProfile } = require("./merchant.controller");
const validate = require("../core/middlewares/validate.middleware");
const MerchantStrategy = require("./merchant.authentication.middelware");
const { registionSchema, loginSchema } = require("./merchant.schema");

module.exports = (app) => {
    app.get("/api/merchants", getMerchants);
    app.post("/api/merchants/singup", validate(registionSchema), signup);
    app.post("/api/merchants/login", validate(loginSchema), login);
    app.get("/api/merchants/profile", MerchantStrategy, getSinginMerchentProfile);
    app.post("/api/merchants/logout", logout);
};