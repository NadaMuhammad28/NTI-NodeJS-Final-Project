const router = require("express").Router();
const Product = require("../controllers/product.controller");
const { auth, authAdmin, authUser } = require("../middleware/auth.middleware");
const upload = require("../middleware/fileUpload.middleware");

//create
router.post(
  "/createProduct",
  auth,
  authAdmin,
  upload.single("image"),
  Product.createProduct
);

//deleteProduct
router.delete(
  "/deleteProduct/:productId",
  auth,
  authAdmin,
  Product.deleteProduct
);

//deleteallProduct
router.delete("/deleteAllProducts", auth, authAdmin, Product.deleteAllProducts);

// PRODUCT BY ID
router.get("/getProduct/:productId", Product.getProduct);

// PRODUCT BY slug
router.get("/getProductBySlug/:productSlug", Product.getProductBySLug);

// get all
router.get("/getAllProducts/", Product.getAllProducts);

//update product
router.post(
  "/updateProduct/:productId",
  auth,
  authAdmin,
  Product.updateProduct
);
// edit image
router.post(
  "/editImage/:id",
  auth,
  authAdmin,
  upload.single("image"),
  Product.editImage
);

module.exports = router;
