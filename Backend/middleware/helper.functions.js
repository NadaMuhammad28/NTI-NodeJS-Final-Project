//WILL BE DELETED , IT IS NOT USED CURRENTLY

const cartModel = require("../models/cart.model");
const { resBuilder } = require("../helper/app.helper");
const productModel = require("../models/product.model");
function totalPriceCount(c) {
  let cost = 0;
  // let cartItems = list;
  c.cartItems.forEach(async (p) => {
    const product = await productModel.findOne({ _id: p.productId });
    cost = cost + product.price * p.quantity;
    console.log(cost);
  });

  return cost;
}
module.exports = totalPriceCount;
