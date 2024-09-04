const { Router } = require("express");
const router = Router();
const expenseController = require("../controller/expenseCategory.controller");
//
router.post("/", expenseController.createExpenseCategory);
router.get("/", expenseController.getExpenseCategories);
router.patch("/:id", expenseController.updateExpenseCategory);
router.delete("/:id", expenseController.deleteExpenseCategory);

module.exports = router;
