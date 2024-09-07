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
   await authService.validateEmail({ res, userEmail: email, userOtp: otp, token });
}

async function login(req, res) {
  const { email, password } = req.body;
  await authService.login({ res, email, password });
}

async function logout(req, res) {
  res.clearCookie(config.tokenHeaderKey);
  res.status(200).send("User logged out succesfully");
}

async function sendResetMail(req, res) {
  const result = await authService.sendResetMail({
    res,
    email: req.body.email,
  });
}

async function resetPw(req, res) {
  const token = req.params.token;
  const result = await authService.resetPw(token);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}

async function updatePw(req, res) {
  await authService.updatePw(req.body);
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
