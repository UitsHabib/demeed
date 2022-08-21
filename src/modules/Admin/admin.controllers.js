const Admin = require('./admin.model');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { email, password } = req.body;

    if(email.length < 10 || password.length < 5) return res.status(400).send('Please provide an valid email and password');
    
    try {
        const notUniqueEmail = await Admin.findOne({ 
            where: { email },
            attributes: ['email']
        });

        if(notUniqueEmail) return res.status(409).send('This email was taken. Please try with another email...');

        const hashedPassword = await bcrypt.hash(password, 11);

        const newAdmin = {
            email,
            password: hashedPassword
        }

        await Admin.create(newAdmin);

        res.status(200).send('Admin create successfully');
    } catch (error) {
        res.status(500).send(error);
    }
};

const signing = async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await Admin.findOne({ where: { email } });

        if(!response) return res.status(401).send('Invalid email & password 1');
        
        const isMatch = await bcrypt.compare(password, response.dataValues.password);
        
        if(!isMatch) return res.status(401).send('Invalid email & password 2');
            
        res.status(200).send('Login success!')
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

module.exports = {
    signup,
    signing
}