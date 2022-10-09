const path = require("path");

const cloudinary = require(path.join(process.cwd(), 'src/config/lib/cloudinary.js'));
const fs = require('fs');

const Product = require(path.join(process.cwd(), "src/modules/product/product.model"));
const Image = require(path.join(process.cwd(), 'src/modules/product/productWithImage.model'));

const products = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).send(products);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

const product = async (req, res) => {
    try {
        const id = req.user.id;

        const { name, price, description, discount, stock_quantity, image } = req.body;

        const [ permission, created ] = await Product.findOrCreate({
            where: { name },
            defaults: { price, description, discount, stock_quantity, image, created_by: id, updated_by: id }
        });

        if(!created) {
            return res.status(409).send("Product is already created.");
        };

        res.status(201).send(permission);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    }
};

const image = async (req,res) => {
    try {
        const id = req.user.id;

        const uploader = async (path) => await cloudinary.uploads(path, 'images');

        const urls = [];
    
        const files = req.files;
    
        for (const file of files) {
            const { path } = file;
    
            const newPath = await uploader(path);
    
            urls.push(newPath);
    
            fs.unlinkSync(path);
            console.log(urls);

            urls.forEach(async (url) => {
                const p = url.url;
                
                try {
                    const [ image, created ] = await Image.findOrCreate({
                        where: { url: p },
                        defaults: { url: p, updated_by: id, created_by: id }
                    });
                    if(!created) {
                        return res.status(409).send("Permission is already created.");
                    };
                    res.status(201).send(image);
                }
                catch (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error.");
                }
            })
            
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports.product = product;
module.exports.products = products;
module.exports.image = image;