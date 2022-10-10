const { profile } = require("console");
const { use } = require("passport");
const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));
const { generateAccessToken } = require(path.join(process.cwd(), "src/modules/platform/user/user.service"));
const EmailService = require(path.join(process.cwd(), 'src/config/lib/email-service/email.service'));
const { Op } = require("sequelize");

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
            defaults: { email, password, created_by: req.user.id, updated_by: req.user.id },
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
	res.status(200).send("Logged out.");
};

const getUsers = async (req, res) => {
    try {
        const page = req.query.page ? req.query.page - 1 : 0;
        if(page < 0) return res.status(404).send("Page must be greater or equal one");

        const limit = req.query.limit ? +req.query.limit : 15;
        const offset = page * limit;
        
        const order = [
            ["created_at", "DESC"],
            ["id", "DESC"]
        ]

        const { count: countByUser, rows: users } = await User.findAndCountAll({
            where: { 
                id: {
                    [Op.ne]: req.user.id
                }
            },
            include: [
                {
                    model: Profile,
                    as: "profile"
                },
                {
                    model: User,
                    as: "createdByUser"
                },
                {
                    model: User,
                    as: "updatedByUser"
                }
            ],
            offset,
            limit,
            order
        });

        const totalUser = countByUser;

        const data = {
            users,
            metaData: {
                page: page + 1,
                limit: limit,
                total: totalUser,
                start: limit * page + 1,
                end: offset + limit > totalUser ? totalUser : offset + limit
            }
        };

        res.status(200).send(data);
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