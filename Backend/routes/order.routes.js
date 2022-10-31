const router = require("express").Router();
const Order = require("../controllers/order.controller");
const { auth, authUser, authAdmin } = require("../middleware/auth.middleware");
const upload = require("../middleware/fileUpload.middleware");

router.post("/add", auth, authUser, Order.addOrder);
router.get("/getOrder/:id", auth, Order.getOrder);
//GET ALL ORDERS OF A USER
router.get("/getAllOrders", auth, authUser, Order.getUSerAllOrders);

router.delete("/deleteOrder/:id", auth, authUser, Order.deleteOrder);
///////////////ADMIN//////////////////////////////
router.get("/allOrders", auth, authAdmin, Order.getALLOrders);
router.post("/updateStatus/:id", auth, authAdmin, Order.updateOrder);
module.exports = router;
