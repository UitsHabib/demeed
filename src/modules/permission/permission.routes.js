const validate = require("../core/middlewares/validate.middleware");
const AdminStrategy = require("../admin/admin.authentication.middelware");
const { permissionSchema, permissionUpdateSchema } = require("./permission.schema");
const { getPermission, createPermission,updatePermission, deletePermission } = require("./permission.controller");

module.exports = (app) => {
    app.route("/api/permissions")
        .get(AdminStrategy, getPermission)
        .post(AdminStrategy, validate(permissionSchema), createPermission);

    app.route("/api/permissions/:id")
        .patch(AdminStrategy, validate(permissionUpdateSchema), updatePermission)
        .delete(AdminStrategy, deletePermission);
};
