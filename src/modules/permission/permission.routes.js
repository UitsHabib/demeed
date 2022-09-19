const { createPermission } = require("./permission.controller");
const validate = require("../core/middlewares/validator.middleware");
const { permissionSchema } = require("./permission.schema");
const AdminStrategy = require("../admin/admin.authentication.middleware");


module.exports = (app) => {
  app.post("/api/permissions", AdminStrategy, validate(permissionSchema), createPermission);
};
