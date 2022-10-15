const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

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

module.exports = updateUser;