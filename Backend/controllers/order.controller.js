const orderModel = require("../models/order.model");
const cartModel = require("../models/cart.model");

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
        resBuilder(res, true, order, "New order is added");
      }
    } catch (e) {
      resBuilder(res, false, e, e.messgae);
    }
  };

  //delete order by user
  static deleteOrder = async (req, res) => {
    try {
      await orderModel.findByIdAndDelete(req.params.id)  // id order 
      resBuilder(res, true, null, "order is deleted");

      }
     catch (e) {
      resBuilder(res, false, e, e.messgae);
    }
  };

  // get order
  static getOrder = async(req,res) =>{
    try{
        const order = await orderModel.findById(req.params.id)   //order id
        resBuilder(res, true, order, "order data is fetched")
    }
    catch(e){
        resBuilder(res, false, e, e.message)
    }
}
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
