const { users, signup, login, profile, logout } = require('./user.controller')

module.exports = app => {
    app.get('/api/users', users);
    app.get('/api/users/profile', profile);
    
    app.post('/api/users/signup', signup);
    app.post('/api/users/login', login);
    app.post('/api/users/logout', logout);
}