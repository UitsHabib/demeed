const Admin = require('./admin.model');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { email, password } = req.body;
    
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
        const { dataValues : { password: pass }} = await Admin.findOne({ where: { email } });
        
        const isMatch = await bcrypt.compare(password, pass);
        
        if(!isMatch) return res.status(403).send('Invalid email & password');
            
        res.status(200).send('Login success!')
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

module.exports = {
    signup,
    signing
}