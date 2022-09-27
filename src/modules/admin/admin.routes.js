const { admins, signup, login, profile, logout } = require('./admin.controller');

const validate = require('../core/middlewares/validator.middleware');
const AdminStrategy = require('./admin.authentication.middleware');
const { registerSchema, loginSchema } = require('./admin.schema');

module.exports = app => {
    app.get('/api/admins', admins);
    app.get('/api/admins/profile', AdminStrategy, profile);
    
    app.post('/api/admins/signup', validate(registerSchema), signup);
    app.post('/api/admins/login', validate(loginSchema), login);
    app.post('/api/admins/logout', logout);
}