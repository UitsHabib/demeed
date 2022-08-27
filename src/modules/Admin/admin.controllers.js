require('dotenv').config();
const Admin = require('./admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema, resetPasswordSchema } = require('./admin.schema');


const registration = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        //Input validation
        await registerSchema.validate({ email, password, confirmPassword }, { abortEarly: false });

        try {
            const notAnUniqueEmail = await Admin.findOne({ 
                   where: { email },
                   attributes: ['email'] //filtering email only
                });
            
            //Check is the email is uniq or not.
            if(notAnUniqueEmail) return res.status(409).send('This email was taken. Please try with another email.');
            
            //Encrypt the password
            const hashedPassword = await bcrypt.hash(password, 11);
    
            const newAdmin = {
               email,
               password: hashedPassword
            };
            
            //Create new admin
            const user = await Admin.create(newAdmin);

            res.status(201).json(user);
        } catch (error) {
            res.status(500).send("Internal server error");
        }      
    } catch (err) {
        const error = [];

        err.inner.forEach((e) => {
            error.push({ path: e.path, message: e.message });
        });

        res.status(400).send(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Input validation
        await loginSchema.validate({ email, password }, { abortEarly: false });

        try {
            //Check the given email
            const user = await Admin.findOne({ where: { email } });

            if (!user) return res.status(401).send('Invalid email & password');
            
            //Check the given password
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) return res.status(401).send('Invalid email & password');

            //Create an access-token
            const access_token = jwt.sign({ id: user.id }, process.env.DEMEED_JWT_SECRET, {
                expiresIn: "1h",
                issuer: user.id.toString()
            });

            //Send the token in cookie
            res.cookie("access_token", access_token, {
                httpOnly: true,
                signed: true
            });
                
            res.status(200).send(user);
        } catch (err) {
            res.status(500).send("Internal server error");
        }
    } catch (err) {
        const error = [];

        err.inner.forEach((e) => {
            error.push({ path: e.path, message: e.message });
        });

        res.status(400).send(error);
    }
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const response = await Admin.findOne({ where: { email } });

        if(!response) return res.status(401).send('No Account Found!');
            
        res.status(200).send('A link is send in you email');
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

const resetPassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        const response = await resetPasswordSchema.validate({ email, oldPassword, newPassword }, { abortEarly: false });

       try {
            const user = await Admin.findOne({ where: { email } });

            if(!user) return res.status(401).send('No Account Found!');

            const isMatch = await bcrypt.compare(oldPassword, user.password); 
            
            if(!isMatch) return res.status(401).send('Wrong Password!');

            const newHashedPassword = await bcrypt.hash(newPassword, 11);

            await Admin.update({ password: newHashedPassword }, { where: { email: email } });

            return res.status(200).send('Password Update Successfully!');
       } catch (error) {
        res.status(500).send("Internal server error");
       }
    } catch (err) {
        const error = [];

        err.inner.forEach((e) => {
            error.push({ path: e.path, message: e.message });
        });

        res.status(400).send(error);
    }
};

const getSignedInUserProfile = async (req, res) => {
    try {
        const token = req.signedCookies["access_token"];

        if (!token) return res.status(400).send('Bad Request');
        
        const userId = jwt.verify(token, process.env.DEMEED_JWT_SECRET);

        const user = await Admin.findOne({ where: { id: userId.id } });

        if (!user) return res.status(400).send("Bad Request");
        
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

const logout = (req, res) => {
    res.clearCookie('access_token');
    res.send('Logged Out');
};


module.exports = {
    login,
    registration,
    logout,
    resetPassword,
    forgetPassword,
    getSignedInUserProfile
}