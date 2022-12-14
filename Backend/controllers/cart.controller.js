const cartModel = require("../models/cart.model");
const { resBuilder } = require("../helper/app.helper");
const productModel = require("../models/product.model");
const totalPriceCount = require("../middleware/helper.functions");
const Product = require("../models/product.model");
const { ObjectId } = require("mongodb");
class Cart {
  static addToCart = async function (req, res, next) {
    try {
      req.body.productId = req.params.productId;
      //search if the cart already exists
      let cart = await cartModel.findOne({ userId: req.user._id });
      if (cart) {
        //see if the product already exists--> if so increase the quantity
        let productIndex = cart.cartItems.findIndex(
          // (p) => p.productId == req.body.productId
          (p) => p.productId == req.body.productId
        );
        if (productIndex != -1) {
          let existingQuantity = +cart.cartItems[productIndex].quantity;
          if (req.body.quantity) {
            existingQuantity += +req.body.quantity;
          } else {
            existingQuantity += +1;
          }
          cart.cartItems[productIndex].quantity = +existingQuantity;
          //  await  cart.save();
        }
        //if it is a new product --> push it
        else {
          //check if it in the product schema in case of a wrong id
          let isProduct = await productModel.findOne({
            _id: req.body.productId,
          });
          if (isProduct != null) {
            cart.cartItems.push(req.body);
          } else {
            throw new Error("product is not found in the DB");
          }
        }

        await cart.save();
        resBuilder(res, true, cart, "product/s added to the cart");
      }
      //no cart found --> create new one
      else {
        const newCart = new cartModel({ cartItems: req.body });
        newCart.userId = req.user._id;

        await newCart.save();
        resBuilder(res, true, newCart, "cart is added");
      }
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  //////////////////////////
  //this function will delete the whole product despite the quantity

  static removeCartITem = async (req, res) => {
    try {
      let cart = await cartModel.findOne({ userId: req.user._id });

      cart.cartItems = cart.cartItems.filter((p) => {
        // p.productId == new ObjectId(req.params.productId);
        return p.productId != req.params.productId;
      });

      await cart.save();
      resBuilder(res, true, cart.cartItems, "product got removed");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static emptyCart = async (req, res) => {
    try {
      const cart = await cartModel.findOneAndDelete({ userId: req.user._id });
      if (cart) resBuilder(res, true, null, "CART IS EMPTY NOW");
      else throw new Error("something is wrong ");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static getCartItems = async (req, res) => {
    const cart = await cartModel.findOne({ userId: req.user._id });
    try {
      if (cart) {
        const productList = await cartModel
          .find({ userId: req.user._id })
          .populate({ path: "cartItems.productId", model: Product });
        // const productList = await cartModel
        //   .find({ userId: req.user._id }, { cartItems: 1 })
        //   .populate({ path: "cartItems.productId", model: Product });
        resBuilder(res, true, productList, "cart items");
      }
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //-----------------------------------------------ADMIN  FUNCTIONALITIES--------------------------------------------------
  //show all carts

  static getAllCarts = async (req, res) => {
    try {
      const carts = await cartModel
        .find()
        .populate({ path: "cartItems.productId", model: Product });
      resBuilder(res, true, carts, "ALL carts RETURNED");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}

module.exports = Cart;
