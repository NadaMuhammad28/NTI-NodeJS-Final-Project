const router = require("express").Router();
const Order = require("../controllers/order.controller");
const { auth, authUser, authAdmin } = require("../middleware/auth.middleware");
const upload = require("../middleware/fileUpload.middleware");

router.post("/add", auth, authUser, Order.addOrder);

module.exports = router;
