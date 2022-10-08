const path = require("path");
const { addCart, getCarts, deleteCart, updateCart } = require(path.join(process.cwd(), "src/modules/cart/cart.controller"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));

module.exports = (app) => {
  app.route("/api/customers/cart").post(UserStrategy, addCart).get(UserStrategy, getCarts);
  app.route("/api/customers/cart/:id").put(UserStrategy, updateCart).delete(UserStrategy, deleteCart);
};
