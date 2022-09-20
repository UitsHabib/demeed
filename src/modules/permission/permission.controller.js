const Permission = require("./permission.model");

const createPermission = async(req,res) =>{
    try {
        const {name, description, service_id} = req.body;
        
        if (req.user.id) {
            await Permission.create({
                name,
                description,
                service_id,
            });
            res.status(201).send({
                name,
                description,
                service_id,
            });
        }else{
            res.status(403).send("Access denied from controller");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}


module.exports.createPermission = createPermission