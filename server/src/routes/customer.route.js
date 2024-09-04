const { Router } = require("express");
const router = Router();
const customerController = require("../controller/customer.controller");

router.post("/", customerController.createCustomer);
router.get("/", customerController.getCustomers);
router.patch("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
