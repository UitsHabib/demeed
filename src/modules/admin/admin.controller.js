const Admin = require('./admin.model');

const signup = (req, res) => {
    const { email, password } = req.body;
    const newAdmin = {
        email, password
    }

    Admin.create(newAdmin)
        .then(admin => {
            res.status(200).send('Admin create successfully');
        })
        .catch(error => {
            console.log(error);
        })
};

const signing = (req, res) => {
    const { email, password } = req.body;

    Admin.findAll({
        where: { email }
    })
        .then(([data]) => {
            const { password: pass } = data;

            if(password === pass){
                res.status(200).send('Login success!');
            }
        })
        .catch(error => {
            res.status(403).send('Invalid email & password');
        })
}

module.exports = {
    signup,
    signing
}