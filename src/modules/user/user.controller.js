const path = require("path");
const User = require("./user.model");
const { generateAccessToken } = require("./user.service");
const EmailService = require("../../config/lib/email-service/email.service");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email, password } });

        if (!user) {
            return res.status(400).send("Invalid credentials.");
        };

        res.cookie("access_token", generateAccessToken(user), {
            httpOnly: true,
            signed: true
        });

        res.status(200).send(user);
    } catch (error) {
        console.log(error);

        res.status(500).send("Internal server error.");
    }
}

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [ user, created ] = await User.findOrCreate({
            where: { email },
            defaults: { email, password }
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

        res.status(500).send("Internal server error.")
    };
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

        res.status(500).send("Internal server error.")
    };
};

module.exports.login = login;
module.exports.logout = logout;
module.exports.signUp = signUp;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.login = login;
module.exports.logout = logout;
module.exports.getSignedInUserProfile = getSignedInUserProfile;

