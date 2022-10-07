const path = require("path");

const MerchantStrategy = require(path.join(process.cwd(), "src/modules/merchant/merchant.authentication.middleware"));

const { registerSchema, loginSchema, userUpdateSchema } = require(path.join(process.cwd(), "src/modules/merchant/merchant.schema.js"));

const { login, logout, signUp, getUsers, updateUser, deleteUser } = require(path.join(process.cwd(), "src/modules/merchant/merchant.controller"));

const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));

module.exports = (app) => {
    app.post("/api/merchants/signup", validate(registerSchema), signUp);
    app.post("/api/merchants/login", validate(loginSchema), login);
    app.get("/api/merchants", MerchantStrategy, getUsers);
    // app.post("/api/merchants/add-products", MerchantStrategy);
};
