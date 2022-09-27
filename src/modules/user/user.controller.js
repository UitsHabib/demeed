const User = require("./user.model");
const EmailService = require("../core/email-service/email.service");
const { generateAccessToken } = require("./user.service");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const userReq = {
			email,
			password,
		};

		const user = await User.findOne({
			where: {
				email: userReq.email,
				password: userReq.password,
			},
		});

		if (!user) {
			return res.status(400).send("Invalid credentials.");
		}

		res.cookie("access_token", generateAccessToken(user), {
			httpOnly: true,
			signed: true,
		});

		res.status(200).json(user);
	} catch (error) {
		res.status(500).send("Internal server error.");
	}
};

const signUp = async (req, res) => {
	try {
		const { email, password } = req.body;

		const [user, created] = await User.findOrCreate({
			where: { email },
			defaults: {
				email,
				password,
			},
		});

		if (!created) {
			return res.status(409).send("User already exists.");
		}

		const options = {
			toAddresses: [email],
			templateUrl: "src/config/lib/email-service/templates/email.handlebars",
			subject: "Registration Confirmation",
			data: {},
		};

		EmailService.send(options);
		res.status(201).send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error.");
	}
};

const getSignedInUserProfile = async (req, res) => {
	try {
		const id = req.user.id;

		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) {
			return res.status(404).send("User not found.");
		}

		res.status(200).send(user);
	} catch (error) {
		res.status(500).send("Internal server error.");
	}
};

const logout = (req, res) => {
	res.clearCookie("access_token");
	res.send("Logged out.");
};

const setProfile = async (req, res) => {
	try {
		const { userId, profile } = req.body;

		const [updatedUser] = await User.update(
			{
				profile,
			},
			{
				where: {
					id: userId,
				},
			}
		);

		if (!updatedUser) {
			return res.status(404).send("User not found.");
		}

		res.status(201).send(updatedUser);
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error.");
	}
};

const deleteUser = async (req, res) => {
	return res.send("deleted");
};

module.exports.login = login;
module.exports.signUp = signUp;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.logout = logout;
module.exports.setProfile = setProfile;
module.exports.deleteUser = deleteUser;
