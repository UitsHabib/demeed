const { use } = require("passport");
const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
//const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));
const { generateAccessToken } = require(path.join(process.cwd(), "src/modules/platform/user/user.service"));
const EmailService = require(path.join(process.cwd(), 'src/config/lib/email-service/email.service'));

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
			//templateUrl: "src/config/lib/email-service/templates/email.handlebars",
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
        const { page, limit } = req.query;
        
        const pageLimit = {
            limit: parseInt(limit) ? parseInt(limit) : 2,
            page: parseInt(page) ? parseInt(page) : 1
        }

        const users = await User.findAll({
            limit: pageLimit.limit,
            offset: pageLimit.limit * (pageLimit.page - 1)
        });

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

const getUserProfile = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findOne({ where: { id } });
        //const profile = await Profile.findOne({ where: { id: user.profile_id } });

        if (!user) return res.status(409).send("User profile not found!");

        res.status(200).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

const updateUserProfile = async (req, res) => {
    try {
        const { email } = req.body;
        const { id } = req.user;

        const user = await User.findOne({ where: { id } });
        //const profile = await Profile.findOne({ where: { id: user.profile_id } });

        if (!user) return res.status(409).send("User profile not found!");

        if(email) await user.update({ email });

        res.status(200).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
}

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

const changePassword = async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
     
        const user = await User.findOne({ where: { id: req.user.id, password: oldPassword } });

        if (!user) return res.status(400).send("Invalid credentials.");
        
        if (newPassword) await user.update({ password: newPassword });

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    }
};

const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;
     
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).send("Invalid credentials.");
        
        const options = {
			toAddresses: [email],
			//templateUrl: "src/config/lib/email-service/templates/email.handlebars",
			subject: "Forgot Password",
			data: {},
		};

		EmailService.send(options);

        return res.status(200).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    }
};

const resetPassword = async (req, res) => {
    try{
        const { password } = req.body;
     
        const user = await User.findOne({ where: { id: req.params.id } });

        if (!user) return res.status(400).send("Invalid credentials.");
        
        if (password) await user.update({ password });

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    }
};

module.exports.login = login;
module.exports.logout = logout;
module.exports.signUp = signUp;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUserProfile = getUserProfile;
module.exports.updateUserProfile = updateUserProfile;
module.exports.changePassword = changePassword;
module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;