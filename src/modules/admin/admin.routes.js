const { admins, signup, login, profile, logout } = require('./admin.controller')

module.exports = app => {
    app.get('/api/admins', admins);
    app.get('/api/admins/profile', profile);
    
    app.post('/api/admins/signup', signup);
    app.post('/api/admins/login', login);
    app.post('/api/admins/logout', logout);
}