const router = require("express").Router();
const User = require("../controllers/user.controller");
const { auth, authUser } = require("../middleware/auth.middleware");

router.post("/register", User.register);
router.post("/login", User.login);

//post logout-->angular
//logout-->auth username, password--> auth userr type
router.post("/logout", auth, authUser, User.logout);
router.post("/logOutAll", auth, authUser, User.logoutAll);
router.post("/editUser", User.editProfile);

module.exports = router;
