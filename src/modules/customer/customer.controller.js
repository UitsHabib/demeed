const path = require("path");
const cloudinary = require(path.join(process.cwd(), "src/config/lib/cloudinary"));
const Customer = require(path.join(process.cwd(), "src/modules/customer/customer.model"));
const { generateAccessToken } = require(path.join(process.cwd(), "src/modules/customer/customer.service"));
const { dataUri } = require(path.join(process.cwd(), "src/modules/core/middlewares/multer.middleware"));

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const customer = await Customer.findOne({ where: { email, password } });

		if (!customer) {
			return res.status(400).send("Invalid credentials.");
		}

		res.cookie("access_token", generateAccessToken(customer), {
			httpOnly: true,
			signed: true,
		});

		res.status(200).send(customer);
	} catch (error) {
		console.log(error);

		res.status(500).send("Internal server error.");
	}
};

const logout = (req, res) => {
	res.clearCookie("access_token");
	res.send("Logged out.");
};

const getCustomerProfile = async (req, res) => {
	try {
		const id = req.user.id;

		const customer = await Customer.findOne({
			where: {
				id,
			},
		});

		if (!customer) {
			return res.status(404).send("Profile not found.");
		}

		res.status(200).send(customer);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error.");
	}
};

const updateCustomerProfile = async (req, res) => {
	try {
		const id = req.user.id;
		const customer = await Customer.findOne({ where: { id } });
		const profileImagePublicId = customer.profile_image_public_id;

		if (req.file?.path) {
			if (profileImagePublicId) await cloudinary.uploader.destroy(profileImagePublicId);

			const fileUrl = await cloudinary.uploader.upload(req.file?.path);

			await Customer.update({ profile_image_url: fileUrl.secure_url, profile_image_public_id: fileUrl.public_id }, { where: { id } });
		}

		return res.status(200).json(customer);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error.");
	}
};

const getCustomerList = async (req, res) => {
	try {
		const customers = await Customer.findAll();
		res.status(200).send(customers);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error.");
	}
};

module.exports.login = login;
module.exports.logout = logout;
module.exports.getCustomerList = getCustomerList;
module.exports.getCustomerProfile = getCustomerProfile;
module.exports.updateCustomerProfile = updateCustomerProfile;
