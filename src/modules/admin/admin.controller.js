const Admin = require("./admin.model");
const { generateAccessToken } = require("./admin.service");

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [ admin, created ] = await Admin.findOrCreate({
            where: { email},
            defaults: { email, password }
        });

        if(!created) {
            return res.status(409).send("Admin already exists.")
        };

        res.status(201).send(admin);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.")
    };
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ where: { email, password } });

        if (!admin) {
            return res.status(400).send("Invalid credentials.");
        };

        res.cookie("access_token", generateAccessToken(admin), {
            httpOnly: true,
            signed: true
        });

        res.status(200).send(admin);
    } catch (error) {
        console.log(error);

        res.status(500).send("Internal server error.");
    }
};

const getSignedInUserProfile = async (req, res) => {
    try {
        const { id } = req.user;
    
        const admin = await Admin.findOne({ where: { id } });
    
        if (!admin) {
            return res.status(404).send("User not found.");
        };
    
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send("Internal server error.");
    }
};
  
const logout = (req, res) => {
    res.clearCookie("access_token");
    res.send("Logged out.");
};

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.logout = logout;
