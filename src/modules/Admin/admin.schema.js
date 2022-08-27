const { object, string, ref } = require("yup");

const registerSchema = object().shape({
    email: string()
        .email("Please enter a valid email.")
        .max(100, "This field must be at lest 100 characters log.")
        .required("This field must not be empty"),
    password: string()
        .min(8, "This field must be at lest 8 character log.")
        .max(50, "This field must be al most 50 character log.")
        .required("This field must not be empty"),
    confirmPassword: string()
        .oneOf([ref("password"), null], "The password must be match")
        .required("This field must not be empty"),
});

const loginSchema = object().shape({
    email: string()
        .email("Please enter a valid email.")
        .required("This field can not be empty"),
    password: string()
        .required("This field can not be empty")
});

const resetPasswordSchema = object().shape({
    email: string()
        .email("Please enter a valid email.")
        .required("This field can not be empty"),
    oldPassword: string()
        .required("This field can not be empty"),
    newPassword: string()
        .required("This field can not be empty")
});

module.exports = {
    registerSchema,
    loginSchema,
    resetPasswordSchema
};