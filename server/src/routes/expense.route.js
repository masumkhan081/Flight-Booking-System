const { Router } = require("express");
const router = Router();
const expenseController = require("../controller/expense.controller");

router.post("/", expenseController.createExpense);
router.get("/", expenseController.getExpenses);
router.patch("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
