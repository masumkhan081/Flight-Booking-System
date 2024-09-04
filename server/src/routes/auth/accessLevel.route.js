const { Router } = require("express");
const router = Router();
const accessLevelController = require("../../controller/auth/accessLevel.controller.js");
const accessControl = require("../../middlewares/verifyToken.js");

//  accessAuthorization({ accessName: "blog", actionName: "create" }),

router.post("/", accessControl("admin"), accessLevelController.createAccessLevel);
router.get("/", accessLevelController.getAccessLevels);
router.patch("/:id", accessLevelController.updateAccessLevel);
router.delete("/:id", accessLevelController.deleteAccessLevel);

module.exports = router;
