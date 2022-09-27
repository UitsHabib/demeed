const jwt = require('jsonwebtoken');
const User = require('./user.model');
const registerSchema = require('./user.schema');

const users = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
}

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        try {
            const [ user, created ] = await User.findOrCreate(
                {
                    where: { email },
                    defaults: { email, password }
                }
            )
            if (!created) {
                res.status(409).send("Already Exists");
            }
            else {
                res.status(201).send(user);
            }
        }
        catch (err) {
            return res.status(500).send("Internal Server error.");
        }
    }
    catch (err) {
        res.status(500).send("Internal Server error.");
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne(
            {
                where: {
                    email,
                    password
                }
            }
        )
    
        if (user) {
            const access_token = jwt.sign(
                {
                    id: user.id
                },
                "jwt-secret",
                {
                    expiresIn: "1h",
                    issuer: user.id.toString()
                }
            );

            res.cookie("access_token", access_token, { httpOnly: true, signed: true });
            res.status(200).send(user);
        }
        else {
            res.status(404).send("Not Found");
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

const profile = async (req, res) => {
    const token = req.signedCookies["access_token"];

    if (!token) {
        res.status(400).send("Bad Request.");
    }
    else {
        const payload = jwt.verify(token, "jwt-secret");
        const { id } = payload;

        try {
            const user = await User.findOne(
                {
                    where: { id }
                }
            )

            res.status(200).json(user);
        }
        catch (err) {
            res.status(404).send("User Not Found.");
        }
    }
}

const logout = (req, res) => {
    res.clearCookie("access_token");
    res.send("Logged Out");
}

module.exports.users = users;
module.exports.signup = signup;
module.exports.login = login;
module.exports.profile = profile;
module.exports.logout = logout;