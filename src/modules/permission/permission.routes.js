const path = require("path");
const { getPermissions, createPermission, updatePermission, deletePermission, getPermission } = require("./permission.controller");
const { permissionSchema, permissionUpdateSchema } = require("./permission.schema");
const UserStrategy = require(path.join(process.cwd(), "/src/modules/user/user.permission.middleware"));
const { ServiceGuard } = require(path.join(process.cwd(), "/src/modules/core/authorization/authorization.middlewares"));
const { Services } = require(path.join(process.cwd(), "/src/modules/core/authorization/authorization.constants"));
const validate = require(path.join(process.cwd(), "/src/modules/core/middlewares/validate.middleware"));

module.exports = (app) => {
  app.route("/api/permissions")
      .get(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION], getPermissions))
      .post(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION], validate(permissionSchema), createPermission));

  app.route("/api/permissions/:id")
      .get(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION]), getPermission)
      .patch(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION]), validate(permissionUpdateSchema), updatePermission)
      .delete(UserStrategy, ServiceGuard([Services.MANAGE_PERMISSION]), deletePermission);
};
