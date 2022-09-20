const User = require("./user.model");

const createUsers = async(req,res) => {
    try {
        const {email,password,role}=req.body;

        const user=await User.create({
            email,
            password,
            role,
        });
        
        res.status(201).send(user.id);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}

const getUsers = async(req,res) => {
    try {
        const user=await User.findAll()
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

module.exports.createUsers = createUsers;
module.exports.getUsers = getUsers;