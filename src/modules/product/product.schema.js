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
});

/*
"name":"Dell-XPS 17",
    "price":"1500 usd", 
    "description":"High Configured Laptop for Engineers.", 
    "discount":"10%", 
    "stock_quantity":"5"
*/

// const userUpdateSchema = object().shape({
//   email: string()
//     .max(100, "This field must be at most 100 characters long."),
//   password: string()
//     .min(8, "This field must be at least 8 characters long.")
//     .max(50, "This field must be at most 50 characters long.")
// });


module.exports.registerSchema = registerSchema;
// module.exports.loginSchema = loginSchema;
// module.exports.userUpdateSchema = userUpdateSchema;
