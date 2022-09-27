const { signupDeliveryMan } = require('./delivery.controller');

module.exports = (app) =>{
    app.post('/delivery/signup',signupDeliveryMan);
}