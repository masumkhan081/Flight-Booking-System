const { Router } = require("express");
const router = Router();
const addressController = require("../controller/address.controller");
//

router.post("/", addressController.createAddress);
router.get("/", addressController.getAddresses);
router.patch("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
