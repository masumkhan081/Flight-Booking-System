const { Router } = require("express");
const router = Router();
const authController = require("../../controller/auth/auth.controller.js");
const validateRequest = require("../../middlewares/validateRequest.js");
const {
  loginSchmea,
  registerSchema,
  emailVerSchema,
  otpVerSchema,
} = require("../../validation/user.validate.js");

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.registerUser
);

router.post(
  "/verify-email",
  validateRequest(otpVerSchema),
  authController.validateEmail
);

router.post("/login",   authController.login);

router.post("/email-verification", authController.sendOTPToEmail);

router.get("/logout", authController.logout);

router.post("/recovery", authController.sendResetMail);

router.get("/recovery/:token", authController.resetPw);

router.post("/reset-password", authController.updatePw);

module.exports = router;
