const { Router } = require("express");
const router = Router();
const saleController = require("../controller/sale.controller");
//

router.post("/", saleController.createSale);
router.get("/", saleController.getSales);
router.patch("/:id", saleController.updateSale);
router.delete("/:id", saleController.deleteSale);

module.exports = router;
