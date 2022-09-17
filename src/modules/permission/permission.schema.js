const { string, array, object } = require("yup");

const permissionSchema = object().shape({
    name: string()
        .max(200, "This field must be at most 200 characters long.")
        .required("This field must not be empty."),
    description: string()
        .max(2000, "This field must be at most 2000 characters long.")
        .required("This  field must not be empty."),
    services: array()
        .required("This  field must not be empty.")
});

const permissionUpdateSchema = object().shape({
    name: string()
        .max(200, "This field must be at most 200 characters long."),
    description: string()
        .max(2000, "This field must be at most 2000 characters long."),
    services: array()
});

module.exports.permissionSchema = permissionSchema;
module.exports.permissionUpdateSchema = permissionUpdateSchema;