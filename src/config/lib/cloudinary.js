const path = require("path");
const cloudinary = require("cloudinary");
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

cloudinary.config({
	cloud_name: nodeCache.getValue("CLOUDINARY_CLOUD_NAME"),
	api_key: nodeCache.getValue("CLOUDINARY_API_KEY"),
	api_secret: nodeCache.getValue("CLOUDINARY_API_SECRET"),
});

const uploadImages = (file, folder) => {
	return new Promise((resolve) => {
		cloudinary.uploader.upload(
			file,
			(result) => {
				resolve({
					url: result.url,
					id: result.public_id,
				});
			},
			{
				resource_type: "auto",
				folder: folder,
			}
		);
	});
};

module.exports.cloudinary = cloudinary;
module.exports.uploadImages = uploadImages;
