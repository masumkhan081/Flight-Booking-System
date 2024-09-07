/* eslint-disable no-unused-vars */
const userModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const { sendOTPMail, sendResetMail } = require("../../utils/mail");
const config = require("../../config");
const httpStatus = require("http-status");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../../utils/pagination");
const { operableEntities } = require("../../config/constants");
const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../../utils/responseHandler");
const crypto = require("crypto-js");

async function register({ res, fullName, email, password, phone }) {
  try {
    const salt = await bcrypt.genSalt(10); // 10 is the number of salt rounds

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new userModel({
      fullName,
      email,
      password: hashedPassword,
      phone,
    }).save();

    sendOTPMail({
      user,
      res,
      successMessage: "An OTP has been sent to your email for verification.",
    });

    // return savedUser;
  } catch (error) {
    sendErrorResponse({ res, error, what: "what" });
  }
}

async function validateEmail({ userEmail, userOtp, token, res }) {
  // decrypted otp and it's expiry time, which to be validated against user typed otp

  const { expireAt, otp, email } = JSON.parse(
    crypto.AES.decrypt(token, config.tkn_secret).toString(crypto.enc.Utf8)
  );
  console.log(expireAt, otp, email);

  if (new Date().getTime() > expireAt) {
    res.send({ statusCode: 400, success: false, message: "OTP expired" });
  } else if (userOtp === otp && userEmail === email) {
    (await userModel.findOneAndUpdate({ email }, { isVerified: true }))
      ? res.send({
          statusCode: 400,
          success: false,
          message: "Account verified. You may login",
        })
      : res.send({
          statusCode: 400,
          success: false,
          message: "Error verifying your account",
        });
  } else {
    res.send({ statusCode: 400, success: false, message: "Invalid OTP" });
  }
}

async function login({ res, email, password }) {
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const bool = await bcrypt.compare(password, user.password);
      console.log("bool: " + JSON.stringify(bool));

      if (bool) {
        if (user.isVerified) {
          res
            .status(200)
            .cookie(
              config.tkn_header_key,
              jwt.sign(
                { user_id: user.id, role: user.role },
                config.tkn_secret,
                config.jwt_options
              ),
              {
                expire: 2628000000 + Date.now(),
              }
            )
            .send({
              success: true,
              message: "You are logged in",
              data: {
                email: user.email,
                phone: user.phone,
                role: user.role,
              },
            });
        }
        // email and associated password matched but email not-verified yet
        else {
          sendOTPMail({
            user,
            res,
            successMessage:
              "Account not verified yet. We sent an OTP to your email for verification.",
          });
        }
      } else {
        res.send({
          statusCode: 400,
          success: false,
          message: "Wrong Credentialss",
        });
      }
    }
    // no user with that username in system
    else {
      res.status(400).send({ nextPage: false, message: "Wrong Credentials" });
    }
  } catch (error) {}
}

async function logout(req, res) {
  res.clearCookie(config.tkn_header_key);
  res.status(200).send("Dick Pulled Out Succesfully");
}
//
async function getUsers({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await userModel
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await userModel.countDocuments({
    title: { $regex: new RegExp(searchTerm, "i") },
  });

  return {
    meta: {
      total,
      limit: viewLimit,
      page: currentPage,
      skip: viewSkip,
      sortBy,
      sortOrder,
    },
    data: fetchResult,
  };
}
//
async function updateUser({ id, data }) {
  try {
    const editResult = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteUser(id) {
  try {
    const deleteResult = await userModel.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

async function sendPassResetMail({ email, res }) {
  const result = await sendResetMail({ email, res });
}

async function resetPw(req, res) {
  const token = req.params.token;
  // const result = await userService.resetPw(token);
}

async function updatePw(req, res) {
  // const result = await userService.updatePw(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
async function sendOTPToEmail(req, res) {
  // const { email } = req.body;

  // const result = await userService.sendOTPToEmail(email);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}

module.exports = {
  register,
  updateUser,
  deleteUser,
  getUsers,
  login,
  sendOTPToEmail,
  sendResetMail,
  validateEmail,
  logout,
  resetPw,
  updatePw,
};
