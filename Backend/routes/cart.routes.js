const router = require("express").Router();
const Cart = require("../controllers/cart.controller");
const { auth, authUser } = require("../middleware/auth.middleware");

//create
router.post("/addToCart/:productId", auth, authUser, Cart.addToCart);
//reomove whole product form cart
router.delete("/removeProduct/:productId", auth, authUser, Cart.removeCartITem);

//GET CART ITEMS
router.get("/getCartItems", auth, authUser, Cart.getCartItems);

//empty cart
router.delete("/emptyCart", auth, authUser, Cart.emptyCart);
module.exports = router;
