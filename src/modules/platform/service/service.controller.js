const path = require('path');
const Service = require(path.join(process.cwd(), "src/modules/platform/service/service.model"));
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));

const getService = async (req, res) => {
    try {
        const page = req.query.page ? req.query.page - 1 : 0;
        if(page < 0) return res.status(404).send("Page must be greater or equal one.");

        const limit = req.query.limit ? +req.query.limit : 15;
        const offset = page * limit;
        
        const order = [
            ["created_at", "DESC"],
            ["id", "DESC"]
        ];

        const { count: totalService, rows: services } = await Service.findAndCountAll({
            offset,
            limit,
            order
        });

        const data = {
            services,
            metaData: {
                page: page + 1,
                limit: limit,
                total: totalService,
                start: limit * page + 1,
                end: offset + limit > totalService ? totalService : offset + limit
            }
        };

        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.")
    };
};

module.exports.getService = getService;