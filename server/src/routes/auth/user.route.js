const { Router } = require("express");
const router = Router();
const userController = require("../../controller/auth/user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const userSchema = require("../../validation/user.validate");
//

router.post("/", validateRequest(userSchema), userController.createUser);
router.get("/", userController.getUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
