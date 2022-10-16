const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(400).send("User not found!");

        await User.destroy({ where: { id } });

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

module.exports = deleteUser;