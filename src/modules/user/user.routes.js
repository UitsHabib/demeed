const { users, signup, login, profile, logout } = require('./user.controller')
const { registerSchema } = require('./user.schema');
const validate = require('../core/middlewares/validator.middleware');

module.exports = app => {
    app.get('/api/users', users);
    app.get('/api/users/profile', profile);
    
    app.post('/api/users/signup', validate(registerSchema), signup);
    app.post('/api/users/login', login);
    app.post('/api/users/logout', logout);
}