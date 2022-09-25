const { getServices } = require("./service.controller");
const AdminStrategy = require("../admin/admin.authentication.middleware");

module.exports = (app) => {
    app.get("/api/services", AdminStrategy, getServices);
};