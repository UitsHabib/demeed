const Service = require("./service.model");

const createService = async(req,res) =>{
    try {
        const {name, description, serviceId} = req.body;
        
        if (req.user.id) {
            await Service.create({
                name,
                description,
                serviceId
            });
            res.status(201).send({
                name,
                description,
                serviceId
            });
        }else{
            res.status(403).send("Access denied from controller");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}


module.exports.createService = createService