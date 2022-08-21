const { getMerchants, merchantSignin, merchantSignUp, merchantForgetPassword } = require("./merchant.controller");

module.exports = (app) => {
    app.get("/merchants", getMerchants);
    app.post("/merchants/singin", merchantSignin);
    app.post("/merchants/singup", merchantSignUp);
    app.post("/merchants/forgetpassword", merchantForgetPassword);
};