const User = require("./user.model");

module.exports.getUsers = (req, res) => {
    User.findAll()
    .then(users => res.send(users))
    .catch(err => console.log(err));
}

module.exports.createUser = async(req, res) => {
    const { email, password } = req.body;

    const newUser = {
        email,
        password
    }

    try{
        const user = await User.create(newUser);
        res.send(user);
    } catch(err) {
        console.log(err);
    }
}