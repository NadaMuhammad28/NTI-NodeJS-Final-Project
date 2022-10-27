const router = require("express").Router();
const Admin = require("../controllers/admin.controller");
const {
  auth,
  authAdmin,
  authUser,
  authSuperAdmin,
} = require("../middleware/auth.middleware");

router.post("/register", Admin.register); //register admin

router.post("/addAdmin", auth, authAdmin, authSuperAdmin, Admin.addAdmin); //add admin
router.delete(
  "/removeAdmin/:id",
  auth,
  authAdmin,
  authSuperAdmin,
  Admin.removeAdmin
); //remove admin

//REMOVE ADMIN ONLY WITHOUT REMOVING WHAT THEY ADDED
router.delete(
  "/removeAdminOnly/:id",
  auth,
  authAdmin,
  authSuperAdmin,
  Admin.removeAdminOnly
); //remove
router.get("/showAllAdmins", auth, authAdmin, Admin.showAllAdmins); // show all admins

module.exports = router;
