const User = require('./user.model.js');
const users = [
    {
        email: "tuhin@gmail.com",
        password: "12345"
    }
];

function getUsers(req,res){
     User.findAll()
     .then(users => {
        res.send(users);
     })
     .catch(err => console.log(err))   
    
}

function createUser(req,res){
    const user = {
        email:req.body.email,
        password:req.body.password
    };
    
    User.create(user)
    .then(user => {
        res.send(user);
    })
    .catch(err =>{
        console.log(err);
    });
    
}

module.exports.getUsers = getUsers;
module.exports.createUser = createUser;