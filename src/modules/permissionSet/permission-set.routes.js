const validate = require("../core/middlewares/validate.middleware");
const AdminStrategy = require("../admin/admin.authentication.middelware");
const { permissionSetSchema, permissionSetUpdateSchema } = require("./permission-set.schema");
const { getPermissionSet, createPermissionSet, updatePermissionSet, deletePermissionSet } = require("./permission-set.controller");

module.exports = (app) => {
    app.route("/api/permission-sets")
        .get(AdminStrategy, getPermissionSet)
        .post(AdminStrategy, validate(permissionSetSchema), createPermissionSet);

    app.route("/api/permission-sets/:id")
        .patch(AdminStrategy, validate(permissionSetUpdateSchema), updatePermissionSet)
        .delete(AdminStrategy, deletePermissionSet);
};