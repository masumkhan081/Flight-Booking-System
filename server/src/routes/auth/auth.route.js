const { Router } = require("express");
const router = Router();
const authController = require("../../controller/auth/auth.controller.js");

//
router.get("/", (req, res) => {
  res.send(
    "wel well well well well well well well well well well well well well well well well well"
  );
});

router.post("/", authController.createUser);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.post("/recovery", authController.sendResetMail);

router.get("/recovery/:token", authController.resetPw);

router.post("/reset-password", authController.updatePw);

router.post("/email-verification", authController.sendOTPToEmail);

router.post("/verify-email", authController.validateEmail);

router.patch(":id", authController.updateUser);

router.delete("/:id", authController.deleteUser);

//  Authorization routes

// -------------------------------------------------------------------------
 
 
module.exports = router;
