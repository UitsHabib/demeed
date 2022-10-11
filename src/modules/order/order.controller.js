const path = require("path");
const Order = require(path.join(process.cwd(), "src/modules/order/order.model"));

const createOrder = async (req, res) => {
    try {
        const { customer_id } = req.body;

        const order = await Order.create({ customer_id });

        if(!order) {
            return res.status(409).send("Invaild Credentials");
        };

        res.status(201).send(order);
       
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    };
}

module.exports.createOrder = createOrder;