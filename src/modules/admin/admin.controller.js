const jwt = require("jsonwebtoken");
const Admin = require('./admin.model');
const registerSchema = require('./register.schema');

const admins = async (req, res) => {
    try {
        const admins = await Admin.findAll()
        res.send(admins);
    }
    catch (err) {
        console.log(err);
    }
}

const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        try {
            await registerSchema.validate({ email, password, confirmPassword }, { abortEarly: false });
        }
        catch (err) {
            const errors = [];

            err.inner.forEach((e) => {
                errors.push({ path: e.path, message: e.message });
            })
            return res.status(400).send(errors);
        }

        const newAdmin = { email, password };
    
        try {
            const admin = await Admin.findOne(
                {
                    where: {
                        email: newAdmin.email
                    }
                }
            )

            if (!admin) {
                const admin = await Admin.create(newAdmin)
                res.status(201).send(admin);
            }
            else {
                res.status(409).send("Already Exists!");
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

const profile = (req, res) => {

    const token = req.signedCookies["access_token"];

    if (!token) {
        return res.status(400).send("Bad Request");
    }

    const payload = jwt.verify(token, "jwt-secret");
   
    const { id } = payload;

    const promise = Admin.findOne(
        {
            where: {
                id
            }
        }
    )
 
    function success(user) {
        console.log(user);
        
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).send("User Not Found!");
        }
    }

    function error(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

    promise
        .then(success)
        .catch(error)
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