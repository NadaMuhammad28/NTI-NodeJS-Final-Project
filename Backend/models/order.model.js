const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = mongoose.Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;