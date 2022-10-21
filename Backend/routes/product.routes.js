const router = require("express").Router();
const Product = require("../controllers/product.controller");
const { auth, authAdmin, authUser } = require("../middleware/auth.middleware");
//create
router.post("/createProduct", auth, authAdmin, Product.createProduct);

/*
//get all categories
router.get("/showCategories", Category.showAllCategories);

//get single category
router.get("/showCategories", Category.showCategory);

//update category
router.post("/updateCategory", auth, authAdmin, Category.updateCategory);

//delete category
router.delete("/deleteCategory", auth, authAdmin, Category.deleteCategory);

//deleteallcategories
router.delete(
  "/deleteAllCategories",
  auth,
  authAdmin,
  Category.deleteAllCategories
);
*/
module.exports = router;
