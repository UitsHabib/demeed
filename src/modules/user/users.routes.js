const { getUsers, createUser ,forgetUserPassword} = require("./users.controller");

module.exports = (app) => {

    app.get('/users', getUsers)

    app.post('/users', createUser)
    
    app.post('/users/forgetPassword',forgetUserPassword)

}