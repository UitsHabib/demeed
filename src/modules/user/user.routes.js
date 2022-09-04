const { getUsers, createUser } = require('./user.controller.js');

module.exports = function users(app){
    


    app.get('/users', getUsers );
    
    app.post('/users', createUser);
    };