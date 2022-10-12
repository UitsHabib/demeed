const Service = require("./service.model");

const getServices = async (req, res) => {
    try {
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);

        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }

        let size = 2;
        if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) {
            size = sizeAsNumber;
        }

        const services = await Service.findAndCountAll({
            limit: size,
            offset: page * size
        });

        res.send({
            content: services.rows,
            totalPages: Math.ceil(services.count / Number.parseInt(size))
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.");
    }
}

module.exports.getServices = getServices;