const DelivaryMan = require('./delivaryMan.model');
const jwt = require("jsonwebtoken");

const users = async (req, res) => {
    try {
        const users = await DelivaryMan.findAll();
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
            const [ user, created ] = await DelivaryMan.findOrCreate(
                {
                    where: { email },
                    defaults: { email, password }
                }
            )
            if (!created) {
                res.status(409).send("Already Exists!");
            }

            else {
                res.status(201).send(user);
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await DelivaryMan.findOne(
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
            res.status(404).send("User not found.");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error.");
    }
}

const profile = async (req, res) => {
    const token = req.signedCookies["access_token"];

    if (!token) {
        res.status(400).send("Bad Request");
    }
    else {
        const payload = jwt.verify(token, "jwt-secret");

        const { id } = payload;

        try {
            const user = await DelivaryMan.findOne(
                {
                    where: { id }
                }
            )
            res.status(200).send(user);
        }
        catch (err) {
            console.log(err);
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