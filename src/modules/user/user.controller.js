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

const createUser =  (req, res) => {
    const user = {
     email: req.body.email,
     password: req.body.password
    }

    User.create(user).then(user => {
        res.send(user);
    }).catch(error => {
        console.log(error);
    });

    // users.push(user);
    //res.send(createdUser);
 }

 module.exports.getUsers = getUsers;
 module.exports.createUser = createUser;