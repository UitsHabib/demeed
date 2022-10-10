const path = require("path");

const cloudinary = require(path.join(process.cwd(), 'src/config/lib/cloudinary.js'));
const Product = require(path.join(process.cwd(), "src/modules/product/product.model"));

const createProduct = async (req, res) => {
    try {
        const { name, price, description, discount, stock_quantity, image } = req.body;

        const [ product, created ] = await Product.findOrCreate({
            where: { name },
            defaults: { price, description, discount, stock_quantity, image, created_by: req.user.id, updated_by: req.user.id }
        });

        if(!created) {
            return res.status(409).send("Product is already created.");
        };

        res.status(201).send(product);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    }
};

const updateProduct = async (req, res) => {
	try {
		const id = req.params.id;
        const product = await Product.findOne({ where: { id } });

		if (req.file?.path) {
			const fileUrl = await cloudinary.uploader.upload(req.file?.path);
			await product.update({ image: fileUrl.secure_url });

		}
        return res.status(200).json(product);

	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error.");
	}
};

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;