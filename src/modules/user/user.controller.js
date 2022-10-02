const path = ("path");
const User = require("./user.model");
const { generateAccessToken } = require("./user.service");

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [user, created] = await User.findOrCreate({ 
            where: { email },
            defaults: { email, password }
        });

        if (!created) {
            return res.status(409).send("User is already exists.");
        };

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.");
    };
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email, password } });

        if (!user) {
            return res.status(400).send("Invaild credentials.");
        };

        res.cookies("access_token", generateAccessToken(user), {
            httpOnly: true,
            signed: true
        });

        res.status(201).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(201).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.");
    };
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(404).send("User not found.");

        if (password) await user.upadate({ password });

        res.status(200).send(user);
    } catch (error) {
        console.log(error);

        res.status(500).send("Internal server error.")
    };
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(404).send("User not found.");

        await User.destory({ where: { id } });

        res.status(200).send(user);
    } catch (error) {
        console.log(error);

        res.status(500).send("Internal server error.")
    };
}

const logout = async (req, res) => {
    res.clearCookie("access_token");
    res.send("Logged out");
    
}

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.logout = logout;
