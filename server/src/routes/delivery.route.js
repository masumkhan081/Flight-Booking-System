const { Router } = require("express");
const router = Router();
const deliveryController = require("../controller/delivery.controller");
//
router.post("/", deliveryController.createOrderDelivery);
router.get("/", deliveryController.getOrderDeliveries);
router.patch("/:id", deliveryController.updateOrderDelivery);
router.delete("/:id", deliveryController.deleteOrderDelivery);

module.exports = router;
