const path = require("path");
const Order = require(path.join(process.cwd(), "src/modules/order/order.model"));

const createOrder = async (req, res) => {
    try {
        const { cart_id } = req.body;

        const [order, created] = await Order.findOrCreate({ 
            where: { cart_id },
            defaults: { customer_id: req.user.id }
        });

        if(!created) {
            return res.status(400).send("Invaild Credentials");
        };

        res.status(201).send(order);     
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    };
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll()

        res.status(200).send(orders)
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal server error.");
    }
}

module.exports.createOrder = createOrder;