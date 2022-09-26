const { string, object, array } = require("yup");

const permissionSchema = object().shape({
  name: string()
    .max(50, "This field must be at most 50 characters long.")
    .required("This field must not be empty."),

  // service_ids: array().of(string())
  // .required("This field must not be empty."),
});

module.exports.permissionSchema = permissionSchema;