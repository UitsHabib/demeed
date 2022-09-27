const path = require("path");
const User = require("./user.model");
const EmailService = require("../../config/lib/email-service/email.service");
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

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).send(users);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [ user, created ] = await User.findOrCreate({
            where: { email },
            defaults: { name, email, password }
        });

        if(!created) return res.status(409).send("User is already created.");

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

        res.status(500).send("Internal server error.")
    };
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password } = req.body;

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(409).send("User was not found!");

        if (name) await user.update({ name });
        
        if (password) await user.update({ password });

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(409).send("User was not found!");

        await User.destroy({ where: { id } });

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

module.exports.getUsers = getUsers;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.login = login;
module.exports.logout = logout;
module.exports.getSignedInUserProfile = getSignedInUserProfile;

