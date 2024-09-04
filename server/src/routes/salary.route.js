const { Router } = require("express");
const router = Router();
const salaryController = require("../controller/salary.controller");
//

router.post("/", salaryController.createSalary);
router.get("/", salaryController.getSalaries);
router.patch("/:id", salaryController.updateSalary);
router.delete("/:id", salaryController.deleteSalary);

module.exports = router;
