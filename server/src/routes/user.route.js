const { Router } = require("express");
const router = Router();
const userController = require("../controller/auth/user.controller.js");
const accessControl = require("../middlewares/verifyToken.js");

// when super-admin creates user account for a salesman
router.post("/", accessControl("admin"), userController.createUser);
router.get("/", userController.getUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
