const { registration, login, resetPassword, forgetPassword, getSignedInUserProfile, logout } = require('./admin.controllers');

const adminRoute = (app) => {
    app.post('/api/admin/register', registration);
    
    app.post('/api/admin/login', login);

    app.post('/api/admin/password/forget', forgetPassword);

    app.put('/api/admin/password/reset', resetPassword);

    app.get('/api/admin/profile', getSignedInUserProfile);

    app.get('/api/admin/logout', logout);
};

module.exports = adminRoute;