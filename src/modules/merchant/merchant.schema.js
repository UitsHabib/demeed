const { object, string, number } = require("yup");

const signUpSchema = object().shape({
  fullName: string().required("This field must not be empty"),
  merchantAge: number()
    .min(18, "Merchant age must be 18 or above.")
    .max(60, "Merchant age must be 60 or less.")
    .required("This field must not be empty."),
  email: string().email().required("This field must not be empty"),
  password: string()
    .min(8, "Password must be more than 8 characters.")
    .required("This field must not be empty "),
});

const loginSchema = object().shape({
  email: string().email().required("This field must not be empty"),
  password: string()
    .min(8, "Password must be more than 8 characters.")
    .required("This field must not be empty "),
});

module.exports.signUpSchema = signUpSchema;
module.exports.loginSchema = loginSchema;
