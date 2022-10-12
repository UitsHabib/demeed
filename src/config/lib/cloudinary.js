const path = require("path");
const cloudinary = require("cloudinary");
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

cloudinary.config({
	cloud_name: nodeCache.getValue("CLOUDINARY_CLOUD_NAME"),
	api_key: nodeCache.getValue("CLOUDINARY_API_KEY"),
	api_secret: nodeCache.getValue("CLOUDINARY_API_SECRET"),
});

module.exports = cloudinary;
