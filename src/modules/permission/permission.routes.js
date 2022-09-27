const path = require("path");
const { permissionSchema, permissionUpdateSchema } = require("./permission.schema");
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const { getPermissions, getPermission, createPermission,updatePermission, deletePermission } = require("./permission.controller");
const UserStrategy = require(path.join(process.cwd(), "src/modules/user/user.authentication.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
    app.route("/api/permissions")
        .get(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION]), getPermissions)
        .post(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION]), validate(permissionSchema), createPermission);

    app.route("/api/permissions/:id")
        .get(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION]), getPermission)
        .patch(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION]), validate(permissionUpdateSchema), updatePermission)
        .delete(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION]), deletePermission);
};
