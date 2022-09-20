const {
    createService
} = require("./service.controller");


const AdminStrategy = require("../admin/admin.authenticate.middleware");
const { authorizeService } = require("./service.authorize.middleware");

module.exports = (app) => {
  
  app.route("/services")
    .post(AdminStrategy, authorizeService, createService);    
};