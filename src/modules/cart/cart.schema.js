const { string, number, object } = require("yup");

const cartSchema = object().shape({
  product_id: string().required("This field must not be empty"),
  quantity: number()
    .required("This field must not be empty")
    .test("Is positive?", "Quantity must be greater than 0", (value) => value > 0),
});

const cartUpdateSchema = object().shape({
  quantity: number()
    .required("This field must not be empty")
    .test("Is positive?", "Quantity must be greater than 0", (value) => value > 0),
});

module.exports.cartSchema = cartSchema;
module.exports.cartUpdateSchema = cartUpdateSchema;
