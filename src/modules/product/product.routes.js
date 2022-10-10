const path = require("path");

const multer = require(path.join(process.cwd(), "src/config/lib/multer.js"));
const MerchantStrategy = require(path.join(process.cwd(), "src/modules/merchant/merchant.authentication.middleware"));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));

const { productSchema } = require(path.join(process.cwd(), "src/modules/product/product.schema.js"));
const { createProduct, updateProduct } = require(path.join(process.cwd(), "src/modules/product/product.controller"));

module.exports = (app) => {
    app.route("/api/merchants/products")
        .post(MerchantStrategy, validate(productSchema), createProduct);

    app.put("/api/merchants/products/:id", MerchantStrategy, multer.single("image"), updateProduct);
};