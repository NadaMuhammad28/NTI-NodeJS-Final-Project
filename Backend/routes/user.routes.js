const router = require("express").Router();
const User = require("../controllers/user.controller");
const { auth, authUser, authAdmin } = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.post("/register", User.register)    // register user
router.post("/login", User.login)    // log in

//post logout-->angular
//logout-->auth username, password--> auth userr type
router.post("/logout", auth, User.logout)    //log out 
router.post("/logOutAll", auth, User.logoutAll)    //log out from all devices

router.get("/profile", auth,User.profile)    // show profile
router.get("/changeStatus", auth ,User.changeStatus)    // activate or deactivate

router.post("/editUser",auth, User.editProfile);    // edit profile
router.post("/uploadImage", auth,  upload.single("image"), User.addImgProfile)   // add profile image

router.delete("/deleteUser/:userId", auth, authAdmin, User.deleteUSer);   //delete user
router.delete("/deleteAll", auth, authAdmin, User.delMany);   //delete all users

router.get("/showAllUsers", auth, authAdmin, User.showAllUsers);     // show all users
router.get("/showOneUser/:id", auth, authAdmin, User.single);     // show all users
module.exports = router;
