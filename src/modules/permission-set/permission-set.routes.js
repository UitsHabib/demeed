const {
  createPermissionSet,
  getAllPermissionSet,
} = require("./permission-set.controller.js");
const validate = require("../core/middlewares/validator.middleware");
const { permissionSetSchema } = require("./permission-set.schema");
const AdminStrategy = require("../admin/admin.authentication.middleware");

module.exports = (app) => {
  app
    .route("/api/permission-sets")
    .post(AdminStrategy, validate(permissionSetSchema), createPermissionSet)
    .get(AdminStrategy, getAllPermissionSet);
};
