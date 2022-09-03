const { admins, signup, login, profile, logout } = require('./admin.controller')
const validate = require('../core/middlewares/validator.middleware');
const { registerSchema } = require('./admin.schema');

module.exports = app => {
    app.get('/api/admins', admins);
    app.get('/api/admins/profile', profile);
    
    app.post('/api/admins/signup', validate(registerSchema), signup);
    app.post('/api/admins/login', login);
    app.post('/api/admins/logout', logout);
}