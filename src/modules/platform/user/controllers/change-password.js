const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findOne({ where: { id: req.user.id, password: oldPassword } });

        if (!user) return res.status(400).send("Invalid credentials.");

        if (newPassword) await user.create({ password: newPassword });

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    };
}

module.exports = changePassword;