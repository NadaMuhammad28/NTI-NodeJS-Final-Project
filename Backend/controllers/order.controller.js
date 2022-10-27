const orderModel = require("../models/order.model");
const cartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
const { resBuilder } = require("../helper/app.helper");

class Order {
  //add order
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
        await cartModel.deleteOne(userCart);
        resBuilder(res, true, order, "New order is added");
      }
    } catch (e) {
      resBuilder(res, false, e, e.messgae);
    }
  };

  // get order
  static getOrder = async (req, res) => {
    try {
      const order = await orderModel
        .findById(req.params.id)
        .populate({ path: "orderItems.productId", model: ProductModel });
      if (!order) throw new Error("order not found");
      resBuilder(res, true, order, "order data is fetched");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  //GET ALL ORDERS BY THIS USER
  static getUSerAllOrders = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ userId: req.user._id })
        .populate({ path: "orderItems.productId", model: ProductModel });
      resBuilder(res, true, orders, "order data is fetched");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  //delete order by user
  static deleteOrder = async (req, res) => {
    try {
      const order = await orderModel.findOne({ _id: req.params.id });
      if (order.status == "processing") {
        await orderModel.deleteOne(order);
        resBuilder(res, true, null, "order is deleted");
      }
      if (order.status != "processing")
        throw new Error("order has been shipped");
    } catch (e) {
      resBuilder(res, false, e, e.messgae);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////
  static getALLOrders = async (req, res) => {
    try {
      const orders = await orderModel
        .find()
        .populate({ path: "orderItems.productId", model: ProductModel });
      if (!orders) throw new Error("order not found");
      resBuilder(res, true, orders, "order data is fetched");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  /*
// update status by admin
static changeStatus = async (req, res) => {
    try {
      if (req.header("status") == "shipped") {
        if (req.user.status) throw new Error("already shipped");
        req.user.status = true;
        await req.user.save();
      } else if (req.header("status") == "delievered") {
        if (!req.user.status) throw new Error("already delievered");
        req.user.status = false;
        await req.user.save();
      } else throw new Error("invalid status");
      resBuilder(res, true, req.user, "changed");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  // get status
  static getOrderStatus = async(req,res) =>{
    try{
        
    }
    catch(e){
        resBuilder(res, false, e, e.message)
    }
    
}
*/
  // get all orders

  // get my orders
}
module.exports = Order;
