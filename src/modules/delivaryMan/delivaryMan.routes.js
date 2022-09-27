const { users, signup, login, profile, logout } = require('./delivaryMan.controller');
const { registerSchema } = require('./delivaryMan.schema');
const validate = require('../core/middlewares/validator.middleware');

module.exports = app => {
    app.get('/api/delivaryMans/users', users);

    app.post('/api/delivaryMans/signup',validate(registerSchema), signup);
    app.post('/api/delivaryMans/login', login);
    app.post('/api/delivaryMans/logout', logout);
    
    app.get('/api/delivaryMans/profile', profile);
}