const Service = require("./service.model");

const getService = async (req, res) => {
    try {
        const services = await Service.findAll();

        res.status(200).send(services);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

module.exports.getService = getService;