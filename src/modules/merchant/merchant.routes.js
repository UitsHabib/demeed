const { getMerchants, login, signup, logout } = require("./merchant.controller");
const validate = require("../core/middlewares/validate.middleware");
const { registionSchema, loginSchema } = require("./merchant.schema");

module.exports = (app) => {
    app.get("/api/merchants", getMerchants);
    app.post("/api/merchants/singup", validate(registionSchema), signup);
    app.post("/api/merchants/login", validate(loginSchema), login);
    app.post("/api/merchants/logout", logout);
};