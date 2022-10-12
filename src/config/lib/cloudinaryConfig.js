const path = require("path");
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));
const { config, uploader } = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

const cloudinaryConfig = (req, res, next) => {
	config({
		cloud_name: nodeCache.getValue("CLOUDINARY_CLOUD_NAME"),
		api_key: nodeCache.getValue("CLOUDINARY_API_KEY"),
		api_secret: nodeCache.getValue("CLOUDINARY_API_SECRET"),
	});

	next();
};

module.exports.cloudinaryConfig = cloudinaryConfig;
module.exports.uploader = uploader;
