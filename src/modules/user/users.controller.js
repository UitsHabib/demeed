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


const login = (req, res) => {
    // console.log("====================TEst=================");
    // console.log(User);

//     const user = {
//         email: req.body.email,
//         password: req.body.password
//  }

    console.log("hi hello");

    // User.findAll()
    // .then(users => {
    //     if(user.email == users.email && user.password == user.password){
    //         console.log("login")
    //     }else{
    //         console.log("not login");
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    // })


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
 module.exports.login = login;
 module.exports.createUser = createUser;