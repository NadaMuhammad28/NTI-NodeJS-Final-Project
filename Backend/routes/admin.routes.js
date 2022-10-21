const router = require("express").Router();
const Admin = require("../controllers/admin.controller");
const { auth, authAdmin, authUser } = require("../middleware/auth.middleware");

const { login, logout, logoutAll } = require("../controllers/user.controller");
router.post("/register", Admin.register);
router.post("/login", login);
router.post("/logout", auth, authAdmin, logout);

router.post("/logOutAll", auth, authAdmin, logoutAll);

router.post("/addAdmin", auth, authAdmin, Admin.addAdmin);

router.get("/showAllUsers", auth, authAdmin, Admin.showAllUsers);

//show all admins
router.get("/showAllAdmins", auth, authAdmin, Admin.showAllAdmins);

//delete user
router.delete("/deleteUser/:userId", auth, authAdmin, Admin.deleteUSer);

module.exports = router;
