const { string, object, array } = require("yup");

const permissionSchema = object().shape({
    title: string()
        .max(100, "This field must be at most 100 characters long.")
        .required("This filed must not be empty"),
    description: string()
        .max(1500, "This field must be at most 1500 characters long.")
        .required("This field must not be empty"),
    services: array()
        .of(string())
        .required("This field must not be empty")
});

const permissionUpdateSchema = object().shape({
    title: string()
        .max(100, "This field must be at most 100 characters long."),
    description: string()
        .max(1500, "This field must be at most 1500 characters long."),
    services: array()
        .of(string())        
});

module.exports.permissionSchema = permissionSchema;
module.exports.permissionUpdateSchema = permissionUpdateSchema;