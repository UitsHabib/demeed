const { deliveryManSignIn, deliveryManSignUp, deliveryManForgotPassword } = require("./delivery.controller");

module.exports = (app) => {

    app.post('/delivery-man/signin/', deliveryManSignIn);

    app.post('/delivery-man/signup/', deliveryManSignUp);

    app.post('/delivery-man/forgot-password', deliveryManForgotPassword);
}