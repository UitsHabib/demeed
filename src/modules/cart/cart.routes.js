const path = require("path");
const { cartSchema, cartUpdateSchema } = require(path.join(process.cwd(), "src/modules/cart/cart.schema"));
const { addCart, getCart, deleteCartItem, updateCartItem } = require(path.join(process.cwd(), "src/modules/cart/cart.controller"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));

module.exports = (app) => {
  app.route("/api/customers/cart").post(UserStrategy, validate(cartSchema), addCart).get(UserStrategy, getCart);
  app.route("/api/customers/cart/cart-items/:id").put(UserStrategy, validate(cartUpdateSchema), updateCartItem).delete(UserStrategy, deleteCartItem);
};
