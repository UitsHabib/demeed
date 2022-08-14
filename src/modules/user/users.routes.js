const { getUsers, createUser, login } = require("./users.controller");

module.exports = (app) => {

    app.get('/users', getUsers)
    app.post('/login', login)
    app.post('/users', createUser)
}