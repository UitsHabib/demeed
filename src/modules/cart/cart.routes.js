const path = require("path");
const { cartSchema, cartUpdateSchema } = require(path.join(process.cwd(), "src/modules/cart/cart.schema"));
const { addCart, getCarts, deleteCart, updateCart } = require(path.join(process.cwd(), "src/modules/cart/cart.controller"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));

module.exports = (app) => {
  app.route("/api/customers/cart").post(UserStrategy, validate(cartSchema), addCart).get(UserStrategy, getCarts);
  app.route("/api/customers/cart/:id").put(UserStrategy, validate(cartUpdateSchema), updateCart).delete(UserStrategy, deleteCart);
};
