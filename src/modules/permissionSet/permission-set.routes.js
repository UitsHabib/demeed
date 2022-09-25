const AdminStrategy = require("../admin/admin.authentication.middelware");
const validator = require("../core/middleware/validator.middleware");
const { permissionSetSchema, permissionSetUpdateSchema } = require("./permission-set.schema");
const { getPermissionSet, createPermissionSet, updatePermissionSet, deletePermissionSet } = require("./permission-set.controller");

module.exports = (app) => {
    app.route("/api/permission-sets")
        .get(AdminStrategy, getPermissionSet)
        .post(AdminStrategy, validator(permissionSetSchema), createPermissionSet);

    app.route("/api/permission-sets/:id")
        .patch(AdminStrategy, validator(permissionSetUpdateSchema), updatePermissionSet)
        .delete(AdminStrategy, deletePermissionSet);
}