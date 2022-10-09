const path = require("path");

const upload = require(path.join(process.cwd(), 'src/modules/core/middlewares/multer.middleware'));

const MerchantStrategy = require(path.join(process.cwd(), "src/modules/merchant/merchant.authentication.middleware"));

const { registerSchema } = require(path.join(process.cwd(), "src/modules/product/product.schema.js"));

const { products, product, image } = require(path.join(process.cwd(), "src/modules/product/product.controller"));

const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));

module.exports = (app) => {
    app.route("/api/merchants/add-products")
        .get(MerchantStrategy, products)
        .post(MerchantStrategy, validate(registerSchema) , product);

        app.route('/api/merchants/add-products/upload-images')
            .post(MerchantStrategy, upload.array('image'), image);
};
