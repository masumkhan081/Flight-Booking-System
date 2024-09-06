const { Router } = require("express");
const router = Router();
const userController = require("../../controller/auth/user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const addressSchema = require("../../validation/address.validate");
//

router.post("/", validateRequest(addressSchema), userController.createUser);
router.get("/", userController.getUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
