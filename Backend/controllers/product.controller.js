const productModel = require("../models/product.model");
const { resBuilder } = require("../helper/app.helper");
const slugify = require("slugify");
class Product {
  static createProduct = async (req, res) => {
    try {
      const product = new productModel(req.body);
      product.adminId = req.user._id;
      product.slug = slugify(req.body.name);
      product.image = req.file.path.replace("public\\", "");
      await product.save();
      resBuilder(res, true, product, "product added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  //DELETE PRODUCT BY ID
  static deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(
        req.params.productId
      );
      // if(!deletedProduct) throw new Error('not found')
      if (deletedProduct == undefined) throw new Error("product id not found");
      resBuilder(res, true, null, "product is removed successfully");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  //DELETE ALL PRODUCTS
  static deleteAllProducts = async (req, res) => {
    try {
      await productModel.deleteMany();
      resBuilder(res, true, null, "All products got deleted");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  //GET PRODUCT BY ID
  static getProduct = async (req, res) => {
    try {
      const productData = await productModel.findById(req.params.productId);
      resBuilder(res, true, productData, "product returned");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  //GET PRODUCT BY SLUG
  static getProductBySLug = async (req, res) => {
    try {
      const productData = await productModel.findOne({
        slug: req.params.productSlug,
      });
      console.log(productData);

      if (!productData) throw new Error("not found");
      resBuilder(res, true, productData, "product returned");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  //GET ALL PRODUCTS

  static getAllProducts = async (req, res) => {
    try {
      const products = await productModel.find();
      resBuilder(res, true, products, "products returned");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  //UPDATE A PRODUCT

  static updateProduct = async (req, res) => {
    try {
      //custom allowed edits
      const allowedEdits = [
        "name",
        "quantity",
        "price",
        "description",
        "images",
      ];
      const keys = Object.keys(req.body);
      //check if the body contains forbiddedn keys
      const isValid = keys.every((el) => allowedEdits.includes(el));
      if (!isValid) throw new Error("invaild edit keys");

      let productData = await productModel.findById(req.params.productId);
      //save updates
      keys.forEach((k) => (productData[k] = req.body[k]));
      await productData.save();
      resBuilder(res, true, productData, "Updated");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static editImage = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      product.image = req.file.path.replace("public\\", "");
      await product.save();
      resBuilder(res, true, product, "image edited");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  /*
  static uploadImages = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.productId);
      product.images.push(req.file.path.replace("public\\", ""));
      await product.save();
      resBuilder(res, true, product, "done");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };*/
}
module.exports = Product;
