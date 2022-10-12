const path = require("path");
const { createOrder } = require(path.join(process.cwd(), "src/modules/order/order.controller"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));

module.exports = (app) => {
    app.post("/api/orders", UserStrategy, createOrder);
}