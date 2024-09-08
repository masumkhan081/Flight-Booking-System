const authService = require("../../services/auth/auth.service");
const httpStatus = require("http-status");
const config = require("../../config/index");
const userModel = require("../../models/user.model");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendAuthResponse,
  success_msg,
} = require("../../utils/responseHandler");
const { operableEntities } = require("../../config/constants");

async function registerUser(req, res) {
  const { fullName, email, password, phone } = req.body;
  await authService.register({
    res,
    fullName,
    email,
    password,
    phone,
  });
}

async function validateEmail(req, res) {
  const { email, otp, token } = req.body;
  await authService.validateEmail({
    res,
    userEmail: email,
    userOtp: otp,
    token,
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  await authService.login({ res, email, password });
}

async function logout(req, res) {
  res.clearCookie(config.tkn_header_key);
  res.send({ status: 200, message: "User logged out succesfully" });
}

async function sendResetMail(req, res) {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    await authService.sendResetMail({
      res,
      user,
    });
  } catch (error) {
    res.send({
      status: 400,
      success: false,
      message: "internal server error",
    });
  }
}

async function resetPw(req, res) {
  await authService.resetPw({ token: req.params.token, res });
}

async function updatePw(req, res) {
  const {email, password, confirmPassword}  =req.body;
  await authService.updatePw({res, email, password, confirmPassword});
}
async function sendOTPToEmail(req, res) {
  const { email } = req.body;

  await authService.sendOTPToEmail(email);
}

//
module.exports = {
  registerUser,
  login,
  logout,
  resetPw,
  updatePw,
  sendOTPToEmail,
  sendResetMail,
  validateEmail,
};
