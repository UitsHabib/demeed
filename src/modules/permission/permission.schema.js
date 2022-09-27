const { string, object } = require("yup");

const permissionSchema = object().shape({
  name: string()
    .max(100, "This field must be at most 100 characters long")
    .required("This field must not be empty"),
});

module.exports.permissionSchema = permissionSchema;
