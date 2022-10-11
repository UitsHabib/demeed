const path = require('path');
const Service = require(path.join(process.cwd(), "src/modules/platform/service/service.model"));

const getService = async (req, res) => {
    try {
        const services = await Service.findAll();

        res.status(200).send(services);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.");
    };
};

module.exports.getService = getService;