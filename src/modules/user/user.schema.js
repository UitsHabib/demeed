const { string, object, ref } = require('yup');

const registerSchema = object().shape(
    {
        email: string()
            .max(100, "This field is maximum 100 characters long.")
            .required("This field must not be empty."),
        
        password: string()
            .min(8, "This field is at least 8 characters long")
            .max(50, "This field must be at most 50 characters long")
            .required("This field must not be empty."),
        
        confirmPassword: string()
            .oneOf([ref("password"), null], "Password must match.")
            .required("This field must not be empty")
    }
)

module.exports = registerSchema;