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

module.exports.getAdmins = getAdmins;
module.exports.createAdmin = createAdmin;