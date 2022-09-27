const { string, array, object } = require("yup");

const permissionSetSchema = object().shape({
    name: string()
        .max(60, "This field must be at most 60 characters long.")
        .required("This field must not be empty."),
    description: string()
        .max(400, "This field must be at most 400 characters long.")
        .required("This  field must not be empty."),
    permissions: array()
        .of(string())
        .required("This  field must not be empty.")
});

const permissionSetUpdateSchema = object().shape({
    name: string()
        .max(60, "This field must be at most 60 characters long."),
    description: string()
        .max(400, "This field must be at most 400 characters long."),
    permissions: array()
        .of(string())
});

module.exports.permissionSetSchema = permissionSetSchema;
module.exports.permissionSetUpdateSchema = permissionSetUpdateSchema;