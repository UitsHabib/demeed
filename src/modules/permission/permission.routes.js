const {
    createPermission
} = require("./permission.controller");


const AdminStrategy = require("../admin/admin.authenticate.middleware");
const { authorizePermission } = require("./permission.authorize.middleware");

module.exports = (app) => {  
  app.route("/permissions")
    .post(AdminStrategy, authorizePermission, createPermission);    
};