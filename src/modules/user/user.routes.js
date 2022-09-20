const {
    createUsers,
    getUsers
} = require("./user.controller");


const AuthorizedUser = require("../core/authorizedUser.middleware");
const AdminStrategy = require("../admin/admin.authenticate.middleware");

module.exports = (app) => {
  
  app.post("/create-users", AdminStrategy, AuthorizedUser, createUsers)
       
  app.get("/get-users", AdminStrategy, AuthorizedUser, getUsers);    
};