const {
   createPermissionSets 
} = require("./permissionSet.controller");

const AdminStrategy = require("../admin/admin.authenticate.middleware");

const { authorizePermissionSets } = require("./permissionSet.authorize.middleware");

module.exports = (app) => {  
  app.route("/permission-sets")
    .post(AdminStrategy, authorizePermissionSets, createPermissionSets);    
};