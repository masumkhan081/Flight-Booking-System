const { Router } = require("express");
const router = Router();
const accessMapController = require("../../controller/auth/accessMap.controller.js");
const accessControl = require("../../middlewares/verifyToken.js");

//  accessAuthorization({ accessName: "blog", actionName: "create" }),

router.post("/", accessControl("admin"), accessMapController.createRole);
router.get("/", accessMapController.getRoles);
router.patch("/:id", accessMapController.updateRole);
router.delete("/:id", accessMapController.deleteRole);

module.exports = router;
