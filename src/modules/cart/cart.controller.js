const path = require("path");
const Cart = require(path.join(process.cwd(), "src/modules/cart/cart.model.js"));

// Add to cart function
const addCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { product_id, quantity } = req.body;
    const cart = { customer_id: id, product_id: product_id, quantity: quantity };
    await Cart.create(cart);
    res.status(201).send("Added to cart !");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Get all cart associated to user
const getCarts = async (req, res) => {
  try {
    const { id } = req.user;
    const carts = await Cart.findAll({ where: { customer_id: id } });
    res.status(200).send(carts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Update Cart
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ where: { id } });
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    if (quantity) cart.update({ quantity });
    res.status(201).send("Cart Updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server");
  }
};

// Delete cart
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { id } });
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    cart.destroy({ where: { id } });
    res.status(200).send("Cart Removed!");
  } catch (err) {
    console.log(err);
    res.send(500).send("Internal Server Error");
  }
};

module.exports.addCart = addCart;
module.exports.getCarts = getCarts;
module.exports.deleteCart = deleteCart;
module.exports.updateCart = updateCart;
