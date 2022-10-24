const router = require("express").Router();
const User = require("../controllers/user.controller");
const { auth, authUser } = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.post("/register", User.register)
router.post("/login", User.login)

//post logout-->angular
//logout-->auth username, password--> auth userr type
router.post("/logout", auth, authUser, User.logout)
router.post("/logOutAll", auth, authUser, User.logoutAll)

router.get("/profile", auth, authUser,User.profile)
router.get("/changeStatus", auth, authUser,User.changeStatus)

router.post("/editUser",auth ,authUser, User.editProfile);
router.post("/uploadImage", auth,  upload.single("image"), User.addImgProfile)

module.exports = router;
