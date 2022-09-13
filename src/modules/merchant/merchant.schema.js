const { object, string, ref } = require("yup");

const registionSchema = object().shape({
    email: string()
        .max(100, "This field must be at most 100 characters long.")
        .required("This field must not be empty."),
    password: string()
        .min(8, "This field must be at least 8 characters long.")
        .max(100, "This field must be at most 50 characters long.")
        .required("This  field must not be empty."),
    confirmPassword: string()
        .oneOf([ref("password")], "Password must match.")
        .required("This  field must not be empty.")
});

const loginSchema = object().shape({
    email: string()
        .max(100, "This field must be at most 100 characters long.")
        .required("This field must not be empty."),
    password: string()
        .min(8, "This field must be at least 8 characters long.")
        .max(100, "This field must be at most 50 characters long.")
        .required("This  field must not be empty."),
})


module.exports.registionSchema = registionSchema;
module.exports.loginSchema = loginSchema;