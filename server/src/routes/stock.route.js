const { Router } = require("express");
const router = Router();
const stockController = require("../controller/stock.controller");
//

router.post("/", stockController.createStock);
router.get("/", stockController.getStocks);
router.patch("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

module.exports = router;
