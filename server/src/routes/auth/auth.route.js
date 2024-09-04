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

//  social login routes

router.use(
  "/facebook",
  require("../../controller/strategies/facebook.route.js")
);
router.use("/google", require("../../controller/strategies/google.route.js"));

router.use(
  "/linkedin",
  require("../../controller/strategies/linkedin.route.js")
);
router.use("/github", require("../../controller/strategies/github.route.js"));

module.exports = router;
