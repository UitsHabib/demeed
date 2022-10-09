const path = require("path");
const multer = require("multer");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single("image");

const dataUri = (req) => {
	const extName = path.extname(req.file.originalname).toString();
	const file64 = parser.format(extName, req.file.buffer);
	return file64;
};
console.log(dataUri);

module.exports.multerUploads = multerUploads;
module.exports.dataUri = dataUri;
