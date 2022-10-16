const { string, ref, object } = require("yup");

const registerSchema = object().shape({
  email: string()
    .max(100, "This field must be at most 100 characters long.")
    .required("This field must not be empty."),
  password: string()
    .min(8, "This field must be at least 8 characters long.")
    .max(50, "This field must be at most 50 characters long.")
    .required("This  field must not be empty."),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Password must match.")
    .required("This  field must not be empty."),
});

const loginSchema = object().shape({
  email: string()
    .max(100, "This field must be at most 100 characters long.")
    .required("This field must not be empty."),
  password: string()
    .min(8, "This field must be at least 8 characters long.")
    .max(50, "This field must be at most 50 characters long.")
    .required("This  field must not be empty."),
});

const userUpdateSchema = object().shape({
  email: string()
    .max(100, "This field must be at most 100 characters long."),
  password: string()
    .min(8, "This field must be at least 8 characters long.")
    .max(50, "This field must be at most 50 characters long.")
});

const changePasswordSchema = object().shape({
  oldPassword: string()
    .min(8, "This field must be at least 8 characters long.")
    .max(50, "This field must be at most 50 characters long.")
    .required("This  field must not be empty."),
  newPassword: string()
    .min(8, "This field must be at least 8 characters long.")
    .max(50, "This field must be at most 50 characters long.")
    .required("This  field must not be empty."),
});

const forgotPasswordSchema = object().shape({
  email: string()
    .max(100, "This field must be at most 100 characters long.")
    .required("This  field must not be empty."),
});

const resetPasswordSchema = object().shape({
  password: string()
    .min(8, "This field must be at least 8 characters long.")
    .max(50, "This field must be at most 50 characters long.")
    .required("This  field must not be empty."),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Password must match.")
    .required("This  field must not be empty."),
});

const updateUserProfileSchema = object().shape({
  email: string()
      .max(60, "This field must be at most 60 characters long.")
      .required("This field must not be empty.")
});


module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
module.exports.userUpdateSchema = userUpdateSchema;
module.exports.changePasswordSchema = changePasswordSchema;
module.exports.forgotPasswordSchema = forgotPasswordSchema;
module.exports.resetPasswordSchema = resetPasswordSchema;
module.exports.updateUserProfileSchema = updateUserProfileSchema;