const { signup, signing } = require('./admin.controller');

const adminRoute = (app) => {
    app.post('/admin/register', signup);

    app.post('/admin/login', signing);
};

module.exports = adminRoute;