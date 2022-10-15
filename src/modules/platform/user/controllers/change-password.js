const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

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

module.exports = changePassword;