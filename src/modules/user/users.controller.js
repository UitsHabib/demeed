const User = require('./user.model')

const getUsers = (req, res) => {
    // console.log("====================TEst=================");
    // console.log(User);

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
     password: req.body.password,
     username:req.body.username
    }

    User.create(user).then(user => {
        res.send(user);
    }).catch(error => {
        console.log(error);
    });

    // users.push(user);
    //res.send(createdUser);
 }
 const forgetUserPassword =  (req, res) => {
    User.findOne({where :{email: req.body.email}})
    .then(user => {
        console.log("AAAAAAAAAAAAAAAAAAAA");
        if(user){
            res.send("Your email for password reset is: " + user.email);
        }
        else{
            res.send("User not found");
        }
    }).catch(error => {
        res.send("Something went wrong",error);
    }
    )
 }

 module.exports.getUsers = getUsers;
 module.exports.createUser = createUser;
 module.exports.forgetUserPassword=forgetUserPassword;