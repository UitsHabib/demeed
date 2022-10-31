const path = require("path");

const MerchantStrategy = require(path.join(process.cwd(), "src/modules/merchant/merchant.authentication.middleware"));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));

const { registerSchema, loginSchema, userUpdateSchema } = require(path.join(process.cwd(), "src/modules/merchant/merchant.schema.js"));
const { login, logout, signUp, getUsers, updateUser, deleteUser } = require(path.join(process.cwd(), "src/modules/merchant/merchant.controller"));

module.exports = (app) => {
    app.post("/api/merchants/registration", validate(registerSchema), signUp);
    app.post("/api/merchants/login", validate(loginSchema), login);
    app.post("/api/merchants/logout", MerchantStrategy, logout);
    app.get("/api/merchants", MerchantStrategy, getUsers);
};