const { getUsers, createUser } = require("./user.controller");

module.exports = (app) => {
    app.get("/users", getUsers);
    
    app.post("/users", createUser);
}