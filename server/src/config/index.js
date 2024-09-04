/* eslint-disable no-undef */
require("dotenv").config();

const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  jwt_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  tkn_header_key: process.env.tkn_header_key,
  host_email: process.env.HOST_EMAIL,
  host_email_pw: process.env.HOST_EMAIL_PASSWORD,
  mail_host: process.env.MAIL_HOST,
  tkn_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  ref_tkn_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  salt_rounds: 12,
  jwt_options: {
    expiresIn: "730h", // Token will expire in 1 hour
  },
};

module.exports = config;
