const { Router } = require("express");
const router = Router();
const supplierController = require("../controller/supplier.controller");
//
router.post("/", supplierController.createSupplier);
router.get("/", supplierController.getSuppliers);
router.patch("/:id", supplierController.updateSupplier);
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
