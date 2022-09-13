const { getPermissions, createPermission } = require("./permission.controller");

module.exports = (app) => {
    app.get("/api/permissions", getPermissions);
    app.post("/api/permissions", createPermission);
};