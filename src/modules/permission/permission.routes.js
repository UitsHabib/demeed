const { createPermission } = require("./permission.controller.js");
const validate = require("../core/middlewares/validator.middleware");
const { permissionSchema } = require("./permission.schema");
const PermissionStrategy = require("./permission.authentication.middleware");

module.exports = (app) => {
  app.post(
    "/api/permissions/create",
    validate(permissionSchema),
    PermissionStrategy,
    createPermission
  );
};
