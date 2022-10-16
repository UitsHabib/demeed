const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

const upadateUserProfile = async (req, res) => {
    try {
        const { email } = req.body;
        const { id } = req.user;

        const user = await User.findOne({ where: { id } });
        
        if (!user) return res.status(401).send("User profile not found.");

        if (email) await user.update({ email });

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.");
    };
}

module.exports = upadateUserProfile;