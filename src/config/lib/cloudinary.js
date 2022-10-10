// const cloudinary = require('cloudinary');

// const dotenv = require('dotenv');
// dotenv.config()

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

// exports.uploads = (file, folder) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (result) => {
//             resolve({
//                 url:result.url,
//                 id:result.public_id
//             })
//         }, {
//             resource_type: 'auto',
//             folder:folder
//         })
//     })
// }

const cloudinary = require("cloudinary");
const nodeCache = require("./nodecache");

cloudinary.config({
	cloud_name: nodeCache.getValue("CLOUDINARY_CLOUD_NAME"),
	api_key: nodeCache.getValue("CLOUDINARY_API_KEY"),
	api_secret: nodeCache.getValue("CLOUDINARY_API_SECRET"),
});

module.exports = cloudinary;