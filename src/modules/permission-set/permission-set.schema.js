const { string, object, array } = require("yup");

const permissionSetSchema = object().shape({
  name: string()
    .max(100, "This field must be at most 100 characters long")
    .required("This field must not be empty"),
  permissionIds: array().required("This field must not be empty"),
});

module.exports.permissionSetSchema = permissionSetSchema;
