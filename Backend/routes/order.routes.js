const router = require("express").Router()
const Order= require("../controllers/order.controller")
const { auth, authUser, authAdmin } = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.post("/add", auth, authUser, Order.addOrder);
router.delete("/deleteOrder/:id",auth,authUser,Order.deleteOrder) 
router.get("/getOrder/:id", auth, Order.getOrder)

module.exports = router
