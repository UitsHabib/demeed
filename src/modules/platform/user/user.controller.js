const path = require("path");
const cloudinary = require(path.join(process.cwd(), "src/config/lib/cloudinary"));
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const Image = require(path.join(process.cwd(), "src/modules/platform/image/image.model"));
const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));
const { generateAccessToken } = require(path.join(process.cwd(), "src/modules/platform/user/user.service"));
const EmailService = require(path.join(process.cwd(), "src/config/lib/email-service/email.service"));

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email, password } });

		if (!user) {
			return res.status(400).send("Invalid credentials.");
		}

		res.cookie("access_token", generateAccessToken(user), {
			httpOnly: true,
			signed: true,
		});

		res.status(200).send(user);
	} catch (error) {
		console.log(error);

		res.status(500).send("Internal server error.");
	}
};

const signUp = async (req, res) => {
	try {
		const { email, password } = req.body;

		const [user, created] = await User.findOrCreate({
			where: { email },
			defaults: { email, password },
		});

		if (!created) return res.status(409).send("User is already created.");

		const options = {
			toAddresses: [email],
			templateUrl: "src/config/lib/email-service/templates/email.handlebars",
			subject: "Registration Confirmation",
			data: {},
		};

		EmailService.send(options);

		return res.status(201).send(user);
	} catch (err) {
		console.log(err);

		res.status(500).send("Internal server error.");
	}
};

const logout = (req, res) => {
	res.clearCookie("access_token");
	res.send("Logged out.");
};

const getUsers = async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).send(users);
	} catch (err) {
		console.log(err);

		res.status(500).send("Internal server error.");
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { password } = req.body;

		const user = await User.findOne({ where: { id } });

		if (!user) return res.status(409).send("User not found!");

		if (password) await user.update({ password });

		return res.status(201).send(user);
	} catch (err) {
		console.log(err);

		res.status(500).send("Internal server error.");
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findOne({ where: { id } });

		if (!user) return res.status(409).send("User not found!");

		await User.destroy({ where: { id } });

		return res.status(201).send(user);
	} catch (err) {
		console.log(err);

		res.status(500).send("Internal server error.");
	}
};

const getCustomerList = async (req, res) => {
	try {
		const customers = await User.findAll({
			include: [
				{
					model: Profile,
					as: "profile",
					where: {
						title: "Customer",
					},
				},
			],
		});

		res.status(200).send(customers);
	} catch (err) {
		console.log(err);

		res.status(500).send("Internal server error.");
	}
};

const getLoggedInCustomerProfile = async (req, res) => {
	try {
		const id = req.user.id;

		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) {
			return res.status(404).send("Profile not found.");
		}

		res.status(200).send(user);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error.");
	}
};

const updateCustomerProfile = async (req, res) => {
	try {
		const id = req.user.id;
		const customer = await User.findOne({ where: { id } });
		const profileImageId = customer.profile_image_id;
		const profileImage = profileImageId
			? await Image.findOne({
					where: {
						id: profileImageId,
					},
			  })
			: null;

		if (req.file?.path) {
			if (profileImage) await cloudinary.uploader.destroy(profileImage.public_id);

			const fileUrl = await cloudinary.uploader.upload(req.file?.path);

			const [profile_image, created] = await Image.findOrCreate({
				where: { public_id: fileUrl.public_id },
				defaults: { url: fileUrl.secure_url, public_id: fileUrl.public_id },
			});

			await User.update(
				{ profile_image_id: profile_image.id },
				{
					where: { id },
					include: [
						{
							model: Image,
							as: "profile_image",
						},
					],
				}
			);
		}
		return res.status(200).json(customer);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error.");
	}
};

module.exports.login = login;
module.exports.logout = logout;
module.exports.signUp = signUp;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getCustomerList = getCustomerList;
module.exports.getLoggedInCustomerProfile = getLoggedInCustomerProfile;
module.exports.updateCustomerProfile = updateCustomerProfile;
