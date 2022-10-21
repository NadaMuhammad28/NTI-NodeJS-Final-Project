const router = require("express").Router();
const Category = require("../controllers/category.controller");
const { auth, authAdmin, authUser } = require("../middleware/auth.middleware");
//create
router.post("/createCategory", auth, authAdmin, Category.createCategory);

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
