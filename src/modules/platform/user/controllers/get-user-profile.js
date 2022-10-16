const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

const getUserProfile = async(req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(401).send("User profile not found!.");

        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    };
}

module.exports = getUserProfile;