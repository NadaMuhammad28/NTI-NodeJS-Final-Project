const orderModel = require("../models/order.model");
const cartModel = require("../models/cart.model");

const { resBuilder } = require("../helper/app.helper");

class Order {
  static addOrder = async (req, res) => {
    try {
      const userCart = await cartModel.findOne({ userId: req.user._id });
      if (userCart) {
        const order = new orderModel({
          userId: req.user._id,
          orderItems: userCart.cartItems,
          ...req.body,
        });
        await order.save();
        resBuilder(res, true, order, "New order is added");
      }
    } catch (e) {
      resBuilder(res, false, e, e.messgae);
    }
  };
}
module.exports = Order;
