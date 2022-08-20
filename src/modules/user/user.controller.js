const User = require('./user.model')

const getUsers = (req, res) => {
    User.findAll()
    .then(users => {
        res.send(users);
    })
    .catch(error => {
        console.log(error);
    })
}

const registerUser =  (req, res) => {
    const user = {
        username:req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    User.create(user).then(user => {
        res.send({'message':'User register successful !'});
    }).catch(error => {
        console.log(error);
    });
 }

 module.exports.getUsers = getUsers;
 module.exports.registerUser = registerUser;