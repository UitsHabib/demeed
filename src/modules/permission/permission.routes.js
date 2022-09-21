const { createPermission } = require("./permission.controller.js");
const validate = require("../core/middlewares/validator.middleware");
const { permissionSchema } = require("./permission.schema");
const AdminStrategy = require("../admin/admin.authentication.middleware");
module.exports = (app) => {
  app.post(
    "/api/permissions/create",
    AdminStrategy,
    validate(permissionSchema),
    createPermission
  );
};
