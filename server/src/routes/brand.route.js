const { Router } = require("express");
const router = Router();
const brandController = require("../controller/brand.controller");
const validateRequest = require("../middlewares/validateRequest");
const brandSchema = require("../validation/brand.validate");
//

router.post("/", validateRequest(brandSchema), brandController.createAddress);
router.get("/", brandController.getAddresses);
router.patch("/:id", brandController.updateAddress);
router.delete("/:id", brandController.deleteAddress);

module.exports = router;
