require("dotenv").config();
const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");

//  send otp to user email for email verification
const sendOTPMail = ({ user, res, successMessage }) => {
  //
  const generatedOTP = generateOTP();
  // console.log("generatedOTP:  " + JSON.stringify(user));
  //
  const mailOptions = getMailOptions({
    to: user.email,
    subject: () => setSubject("verification"),
    html: () => getVerificationMessage(generatedOTP),
  });
  //
  const transporter = getTransporter();

  transporter
    .sendMail(mailOptions)
    .then((result) => {
      result.accepted.includes(user.email)
        ? res.status(201).send({
            success: true,
            message: successMessage,
            otp: generatedOTP,
            email:email,
            token: getOtpToken({ otp: generatedOTP, email: user.email }),
          })
        : res.status(400).send({ success: false,message: "Error sendign otp to the mail" });
    })
    .catch((err) => {
      // console.log(err);
      res.send(err.message);
    });
};

//  send password reset link to user email
async function sendResetMail({ user, res }) {
  const mailOptions = getMailOptions({
    to: user.email,
    subject: () => setSubject("recovery"),
    html: () => getResetLink(user),
  });
  //
  const transporter = getTransporter();
  //
  transporter
    .sendMail(mailOptions)
    .then((result) => {
      result
        ? res.status(200).send({ message: "A recovery mail has been sent " })
        : res
            .status(400)
            .send({ message: "Error sendign password reset mail" });
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
}

const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const getVerificationMessage = (otp) =>
  `<h4 style="color:blue;text-align:center;">Please copy or type the OTP provided below: <br><br>${otp}`;

function getResetLink(user) {
  return `<h4 style="color:blue;text-align:center;">Please click the link to reset your password: </h4><br><br>${
    config.base_url
  }/auth/recovery/${jwt.sign(
    {
      id: user.id,
      email: user.email,
      expireAt: new Date().getTime() + 5 * 60000,
    },
    config.tkn_secret
  )}`;
}

// return a relatable email sibject based on purpose of the mail
const setSubject = (action) =>
  action === "recovery"
    ? `${config.app_name}: Recover Your Password`
    : action === "verification"
    ? `${config.app_name}: Verify Your Email`
    : "";

const getMailOptions = ({ to, subject, html }) => {
  return {
    from: config.host_email,
    to,
    subject: subject(),
    html: html(),
  };
};

const getTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.host_email,
      pass: config.host_email_pw,
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });

//  create and return a encrypted token holding data: otp and expiration time for it
const getOtpToken = ({ otp, email }) =>
  CryptoJS.AES.encrypt(
    JSON.stringify({
      email,
      otp,
      expireAt: new Date().getTime() + 5 * 60000,
    }),
    config.tkn_secret
  ).toString();

module.exports = {
  sendResetMail,
  sendOTPMail,
};
