const path = require("path");
const cloudinary = require(path.join(process.cwd(), 'src/config/lib/cloudinary.js'));

async function upload (options) {    
    const file = options.fileName;
    delete options.fileName;

    const response = await cloudinary.uploader.upload(file, options);
    return response;
}

async function deleteFiles (options) {

}

module.exports.upload = upload;
module.exports.deleteFiles = deleteFiles;