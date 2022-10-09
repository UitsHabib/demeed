const { string, ref, object } = require("yup");

const registerSchema = object().shape({
    name: string()
        .max(50, "This field must be at most 50 characters long.")
        .required("This field must not be empty."),
    price: string()
        .min(4, "This field must be at least 4 characters long.")
        .required("This  field must not be empty."),
    description: string()
        .max(500, "This field must be at most 500 characters long.")
        .required("This field must not be empty."),
    discount: string()
        .min(1, "This field must be at most 1 characters long.")
        .max(3, "This field must be at most 3 characters long.")
        .required("This field must not be empty."),
    stock_quantity: string()
        .required("This field must not be empty."),
    image: string()
        .required("This field must not be empty."),
});

module.exports.registerSchema = registerSchema;
