const { Router } = require("express");
const router = Router();
const userController = require("../../controller/auth/user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const userSchema = require("../../validation/user.validate");
const accessControl = require("../../middlewares/verifyToken");
//

// router.post("/", validateRequest(userSchema), userController.createUser);
router.get("/", accessControl("ADMIN"), userController.getUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
