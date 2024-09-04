const { Router } = require("express");
const router = Router();
const employeeController = require("../controller/employee.controller");
const verifyQueryParams = require("../middlewares/verifyQueryParams")
const {operableEntities} = require("../config/constants");

//

router.post("/", employeeController.createEmployee);
router.get("/", verifyQueryParams(operableEntities.employee), employeeController.getEmployees);
router.patch("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
