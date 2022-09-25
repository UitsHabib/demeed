const { string, array, object } = require("yup");

const permissionSetSchema = object().shape({
    name: string()
        .max(200, "This field must be at most 200 characters long.")
        .required("This field must not be empty."),
    description: string()
        .max(2000, "This field must be at most 2000 characters long.")
        .required("This  field must not be empty."),
    permissions: array()
        .required("This  field must not be empty.")
});

const permissionSetUpdateSchema = object().shape({
    name: string()
        .max(200, "This field must be at most 200 characters long."),
    description: string()
        .max(2000, "This field must be at most 2000 characters long."),
    permissions: array()
});

module.exports.permissionSetSchema = permissionSetSchema;
module.exports.permissionSetUpdateSchema = permissionSetUpdateSchema;