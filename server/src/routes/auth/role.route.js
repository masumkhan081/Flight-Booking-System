const { Router } = require("express");
const router = Router();
const roleController = require("../../controller/auth/role.controller.js");
const accessControl = require("../../middlewares/verifyToken.js");


//  accessAuthorization({ accessName: "blog", actionName: "create" }),


router.post("/", accessControl("admin"), roleController.createRole);
router.get("/", roleController.getRoles);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

module.exports = router;
