const path = require("path");
const fs = require('fs');

const cloudinary = require(path.join(process.cwd(), 'src/config/lib/cloudinary.js'));

module.exports = async (req) => {
    const uploader = async (path) => await cloudinary.uploadImages(path, 'images');

    const urls = [];

    const files = req.files;

    for (const file of files) {
        const { path } = file;

        const newPath = await uploader(path);

        urls.push(newPath);

        fs.unlinkSync(path);
    }

    const imageLinks = [];
    
    urls.forEach((object) => {
        const url = object.url;
        
        imageLinks.push(url);
    })
    console.log(imageLinks);

    const one = imageLinks[0];
    const two = imageLinks[1];

    const three = one + " , " + two;
    return three;
}