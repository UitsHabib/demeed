const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

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

module.exports = resetPassword;