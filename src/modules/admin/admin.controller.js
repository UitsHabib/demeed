const jwt = require("jsonwebtoken");
const Admin = require('./admin.model.js');
const admin = [
    {
        email: "tuhin@gmail.com",
        password: "12345"
    }
];

function getAdmins(req,res){
     Admin.findAll()
     .then(admin => {
        res.send(admin);
     })
     .catch(err => console.log(err))   
    
};

function createAdmin(req,res){
    const admin = {
        email:req.body.email,
        password:req.body.password
    };
    
    Admin.create(admin)
    .then(admin => {
        res.send(admin);
    })
    .catch(err =>{
        console.log(err);
    });
    
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = {
        email,
        password
    };

    const promise = Admin.findOne({
        where: {
            email: user.email,
            password: user.password
        },
    });

    function success(user) {
        console.log(user);
        if (user) {
            const access_token = jwt.sign(
                {
                    id: user.id
                },
                "mysecret",
                {
                    expiresIn: "1h",
                    issuer: user.id.toString()
                }
            );

            res.cookie("access-token", access_token, {
                httpOnly: true,
                signed: true
            });

            res.status(200).json(user);
        } else {
            res.status(404).send("User not found.");
        }
    };

    function err(err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    }

    promise.then(success).catch(err);
}

module.exports.getAdmins = getAdmins;
module.exports.createAdmin = createAdmin;
module.exports.login = login;