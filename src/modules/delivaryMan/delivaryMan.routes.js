const { users, signup, login, profile, logout } = require('./delivaryMan.controller');

module.exports = app => {
    app.get('/api/delivaryMans/users', users);

    app.post('/api/delivaryMans/signup', signup);
    app.post('/api/delivaryMans/login', login);
    app.post('/api/delivaryMans/logout', logout);
    
    app.get('/api/delivaryMans/profile', profile);
}