const router = require("express").Router();
const Admin = require("../controllers/admin.controller");
const { auth, authAdmin, authUser } = require("../middleware/auth.middleware");


router.post("/register", Admin.register);   //register admin

router.post("/addAdmin", auth, authAdmin, Admin.addAdmin);    //add admin
router.post("/removeAdmin/:id", auth, authAdmin, Admin.removeAdmin);    //remove admin

router.get("/showAllAdmins", auth, authAdmin, Admin.showAllAdmins);    // show all admins

module.exports = router;
