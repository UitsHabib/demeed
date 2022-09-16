const {
  createPermissionSet,
  getPermissionSets,
} = require("./permission-set.controller.js");
const validate = require("../core/middlewares/validator.middleware");
const { permissionSetSchema } = require("./permission-set.schema");
const PermissionSetStrategy = require("./permission-set.authentication.middleware");

module.exports = (app) => {
  app
    .route("/api/permission-sets")
    .get(PermissionSetStrategy, getPermissionSets)
    .post(
      PermissionSetStrategy,
      validate(permissionSetSchema),
      createPermissionSet
    );
};
