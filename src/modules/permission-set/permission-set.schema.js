const { string, object, ref } = require('yup');

const permissionSchema = object(). shape(
    {
        name: string()
            .min(4, "This field must be at least 4 characters long")
            .max(100, "This Field Must be at most 100 characters long")
            .required("This field must not be empty"),
        permissions: string()
            .min(4, "This field must be at least 4 characters long")
            .max(50, "This Field Must be at most 50 characters long")
            .required("This field must not be empty")
    }
);

module.exports.permissionSchema = permissionSchema;