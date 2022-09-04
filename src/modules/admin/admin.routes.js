const { getAdmins, createAdmin, login } = require('./admin.controller.js');

module.exports = function users(app){

    app.get('/admins', getAdmins );
    
    app.post('/admins', createAdmin);

    app.post('/login', login );
};