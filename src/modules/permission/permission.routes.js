const { createPermission } = require("./permission.controller");
const validate = require("../core/middlewares/validator.middleware");
const { permissionSchema } = require("./permission.schema");
const PermissionStrategy = require("./permission.authentication.middleware");

module.exports = (app) => {
  app.post(
    "/api/permissions",
    PermissionStrategy,
    validate(permissionSchema),
    createPermission
  );
};
