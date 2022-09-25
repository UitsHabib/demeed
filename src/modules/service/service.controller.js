const Service = require("./service.model");

const getServices = async (req, res) => {
    try{
        const services = await Service.findAll();

        res.status(200).send(services);
    } 
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error.");
    }
}

module.exports.getServices = getServices;