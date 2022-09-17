const validator = require("../core/middleware/validator.middleware");
const { getPermission, createPermission,updatePermission, deletePermission } = require("./permission.controller");
const AdminStrategy = require("../admin/admin.authentication.middelware");
const { permissionSchema, permissionUpdateSchema } = require("./permission.schema");

module.exports = (app) => {
    app.route("/api/permissions")
        .get(AdminStrategy, getPermission)
        .post(AdminStrategy, validator(permissionSchema), createPermission);

    app.route("/api/permissions/:id")
        .patch(AdminStrategy, validator(permissionUpdateSchema), updatePermission)
        .delete(AdminStrategy, deletePermission);
};