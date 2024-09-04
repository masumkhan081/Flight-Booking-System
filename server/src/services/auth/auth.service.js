/* eslint-disable no-unused-vars */
const userModel = require("../../models/auth/user.model");
const bcrypt = require("bcrypt");
const mailService = require("../../utils/mail");
const config = require("../../config");
const httpStatus = require("http-status");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../../utils/pagination");

const { operableEntities } = require("../../config/constants");

const jwt = require("jsonwebtoken");

async function createUser({ res, username, email, phone, password }) {
  const salt = await bcrypt.genSalt(10); // 10 is the number of salt rounds

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await new userModel({
    username,
    email,
    password: hashedPassword,
    phone,
  }).save();

  // -------- for current project, we don't need this portion
  // user
  //   ? mailService.sendOTPMail({
  //       user,
  //       res,
  //       successMessage: "An OTP has been sent to your email for verification.",
  //     })
  //   : res.status(400).send("Error creating account");
}

async function login({ res, username, password }) {
  // registered or not
  const user = await userModel.findOne({ userName: username });

  if (user) {
    // email and associated password matched and verified
    console.log(
      JSON.stringify(password),
      "   ---   " + JSON.stringify(user.password)
    );

    const bool = await bcrypt.compare(password, user.password);
    // console.log(JSON.stringify(bool));

    if (bool) {
      if (user.isVerified) {
        res
          .status(200)
          .cookie(
            config.tkn_header_key,
            jwt.sign(
              { user_id: user.id, role: user.role },
              config.jwt_secret,
              config.jwt_options
            ),
            {
              expire: 2628000000 + Date.now(),
            }
          )
          .send({
            nextPage: true,
            message: "You are logged in",
            email: user.email,
            phone: user.phone,
            userName: user.userName,
            role: user.role,
          });
      }
      // doesn't go with out current project
      // email and associated password matched but email not-verified yet
      // else {
      //   mailService.sendOTPMail({
      //     user,
      //     res,
      //     successMessage:
      //       "Account not verified yet. We sent an OTP to your email for verification.",
      //   });
      // }
    } else {
      res.status(400).send({ nextPage: false, message: "Wrong Credentialss" });
    }
  }
  // no user with that username in system
  else {
    res.status(400).send({ nextPage: false, message: "Wrong Credentials" });
  }
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

async function sendResetMail(req, res) {
  // destructuring the expected
  const { email } = req.body;
  // const result = await mailService.sendResetMail(email);

  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}

async function resetPw(req, res) {
  const token = req.params.token;
  // const result = await userService.resetPw(token);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
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
async function validateEmail(req, res) {
  // const { email, otp, token } = req.body;
  const result = await userService.validateEmail({ email, otp, token });

  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}

module.exports = {
  createUser,
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
