const Service = require("./service.model");

const getService = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const pageLimit = {
            limit: parseInt(limit) ? parseInt(limit) : 2,
            page: parseInt(page) ? parseInt(page) : 0
        };

        const services = await Service.findAll({
            limit: pageLimit.limit,
            offset: pageLimit.limit * pageLimit.page
        });

        res.status(200).send(services);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

module.exports.getService = getService;