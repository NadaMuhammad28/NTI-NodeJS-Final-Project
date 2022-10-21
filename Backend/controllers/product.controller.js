const productModel = require("../models/product.model");
const { resBuilder } = require("../helper/app.helper");
const { objectId } = require("mongoose");
class Category {
  static createProduct = async (req, res) => {
    try {
      const product = new productModel(req.body);
      product.adminId = req.user._id;
      await product.save();
      resBuilder(res, true, product, "product added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static delet;
}
module.exports = Category;
