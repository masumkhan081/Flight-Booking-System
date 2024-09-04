const { Router } = require("express");
const router = Router();
const productController = require("../controller/product.controller.js");
//
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
