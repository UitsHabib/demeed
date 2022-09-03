const jwt = require("jsonwebtoken");
const Admin = require('./admin.model');

const admins = async (req, res) => {
    try {
        const admins = await Admin.findAll()
        res.send(admins);
    }
    catch (err) {
        console.log(err);
    }
}

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        try {

            const [ user, created ] = Admin.findOrCreate( 
                {
                    where: {
                        email
                    },
                    defaults: {
                        email,
                        password
                    }
                }
            );

            if (!created) {
                return res.status(409).send("User Already Exists");
            }
            else {
                res.status(201).send(user);
            }
        }
        catch (err) {
            res.send(err);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = { email, password };
    try {
        const admin = await Admin.findOne(
            {
                where: {
                    email: user.email,
                    password: user.password
                }
            }
        )
         
        if (admin) {
            const access_token = jwt.sign(
                { 
                    id: admin.id 
                },
                "jwt-secret", 
                { 
                    expiresIn: '1h', 
                    issuer: admin.id.toString() 
                }
            );

            res.cookie("access_token", access_token, { httpOnly: true, signed: true });

            res.status(200).json(admin);
        }
        else {
            res.status(404).send("Admin Not Found!");
        }

    }

    catch (error) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

const profile = async (req, res) => {

    const token = req.signedCookies["access_token"];

    if (!token) {
        return res.status(400).send("Bad Request");
    }

    else {
        const payload = jwt.verify(token, "jwt-secret");
   
        const { id } = payload;

        try {
            const user = await Admin.findOne(
                {
                    where: { id }
                }
            )
            
            if (user) {
                res.status(200).send(user);
            }
            else {
                res.status(404).send("User Not Found!");
            }
        }
        catch (err) {
            res.status(500).send("Internal Server Error.");
        }
    }
}

const logout = (req, res) => {
    res.clearCookie("access_token");
    res.send("Logged Out");
}

module.exports.admins = admins;
module.exports.signup = signup;
module.exports.login = login;
module.exports.profile = profile;
module.exports.logout = logout;