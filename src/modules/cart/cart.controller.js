const path = require("path");
const Cart = require(path.join(process.cwd(), "src/modules/cart/cart.model.js"));
const CartItem = require(path.join(process.cwd(), "src/modules/cart/cart-item.model.js"));

// Add to cart function
const addCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { product_id, quantity } = req.body;
    const [cart, created] = await Cart.findOrCreate({ where: { customer_id: id }, defaults: { customer_id: id } });
    if (created) {
      const cartItems = await CartItem.create({ cart_id: cart.id, product_id: product_id, quantity: quantity });
      res.status(201).send(cartItems);
    }
    if (cart) {
      const existsCartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id: product_id } });
      if (existsCartItem) {
        const updateQuantity = existsCartItem.quantity + quantity;
        existsCartItem.update({ quantity: updateQuantity });
        res.status(200).send(existsCartItem);
      } else {
        const cartItems = await CartItem.create({ cart_id: cart.id, product_id: product_id, quantity: quantity });
        res.status(201).send(cartItems);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Get cart associated to user
const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ where: { customer_id: id }, include: [{ model: CartItem, as: "cartItems" }] });
    res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.quantity;
    const cartItem = await CartItem.findOne({ where: { id } });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Delete cart Item
const deleteCartItem = async (req, res) => {
  console.log("Delete cart coming soon here ");
};

module.exports.addCart = addCart;
module.exports.getCart = getCart;
module.exports.updateCartItem = updateCartItem;
module.exports.deleteCartItem = deleteCartItem;
