const { string, object, ref } = require("yup");

const registerSchema = object().shape({
  email: string()
    .max(100, "This field must be at most 100 characters long.")
    .required("This field must not be empty."),
  password: string()
    .min(8, "This field must be at least 8 characters long.")
    .max(100, "This field must be at most 100 characters long.")
    .required("This field must not be empty."),
  confirmPassword: string()
    .oneOf([ref("password"), null], "passwords must be match")
    .required("This field must not be empty.")
});

const loginSchema = object().shape({
  email: string()
    .max(100, "This field must be at most 100 characters long.")
    .required("This field must not be empty."),
  password: string()
    .min(8, "This field must be at least 8 characters long.")
    .max(100, "This field must be at most 100 characters long.")
    .required("This field must not be empty."),
});

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
