const path = require("path");
const storageService = require(path.join(process.cwd(), "src/modules/core/storage/storage.service"));
const Product = require(path.join(process.cwd(), "src/modules/product/product.model"));
const File = require(path.join(process.cwd(), "src/modules/core/storage/file.model"));

const createProduct = async (req, res) => {
    try {
        const { name, price, description, discount, stock_quantity, image } = req.body;

        const product = await Product.create({
            name,
            price, 
            description,
            discount, 
            stock_quantity, 
            created_by: req.user.id, 
            updated_by: req.user.id 
        });

        if (req.files) {
            await Promise.all(req.files.map(async file => {
                const uploadOptions = {
                    folder: "demeed/products",
                    use_filename: true,
                    fileName: file.path
                };

                const response = await storageService.upload(uploadOptions);
                await File.create({
                    name: response.url,
                    owner_id: product.id,
                    table_name: "products",
                    created_by: req.user.id,
                    updated_by: req.user.id
                });
            }));
        };

        const updatedProduct = await Product.findOne({
            where: { id: product.id },
            include: [
                {
                    model: File,
                    as: "files"
                }
            ]
        });

        res.status(201).send(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.")
    }
};

const updateProduct = async (req, res) => {
	try {
		const id = req.params.id;

        const product = await Product.findOne({ where: { id } });
        console.log
		if (req.files) {
			const fileUrl = await uploadImages(req);
            console.log(fileUrl);
			await product.update({ image: fileUrl });

		}
        return res.status(200).json(product);

	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error.");
	}
};

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;