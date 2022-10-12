const path = require("path");

const { cloudinary } = require(path.join(process.cwd(), 'src/config/lib/cloudinary.js')); // for multer upload

const uploadImages = require(path.join(process.cwd(), "src/config/lib/upload-images"));

const Product = require(path.join(process.cwd(), "src/modules/product/product.model"));

const createProduct = async (req, res) => {
    try {
        const { name, price, description, discount, stock_quantity, image } = req.body;

        if (req.files) {
            const image = await uploadImages(req);

            const [ product, created ] = await Product.findOrCreate({
                where: { name },
                defaults: { price, description, discount, stock_quantity, image, created_by: req.user.id, updated_by: req.user.id }
            });
    
            if(!created) {
                return res.status(409).send("Product is already created.");
            };
    
            res.status(201).send(product);
        }

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


/* Update a single image using multer
----
// const updateProduct = async (req, res) => {
// 	try {
// 		const id = req.params.id;
//         console.log(id);
//         const product = await Product.findOne({ where: { id } });
//         console.log(product);

// 		if (req.file?.path) {
// 			const fileUrl = await cloudinary.uploader.upload(req.file?.path);
// 			await product.update({ image: fileUrl.secure_url });

// 		}
//         return res.status(200).json(product);

// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send("Internal server error.");
// 	}
// };

*/

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;