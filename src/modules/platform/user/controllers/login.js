const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const { generateAccessToken } = require(path.join(process.cwd(), "src/modules/platform/user/user.service"));

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

module.exports = login;