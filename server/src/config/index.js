/* eslint-disable no-undef */
require("dotenv").config();

const config = {
  base_url:"http://localhost:3000",
  app_name: "Excel Flight Booking System",
  port: process.env.PORT || 3000,
  db_url:
    process.env.DB_URL ||
    "mongodb+srv://masumkhan-axilsoft:axilsoft@cluster0.ix6u2ot.mongodb.net/",
  tkn_secret: process.env.JWT_ACCESS_TOKEN_SECRET || "i-act-as-token-secret",
  ref_tkn_secret:
    process.env.JWT_REFRESH_TOKEN_SECRET || "i-act-as-refresh-token-secret",
  tkn_header_key: process.env.tkn_header_key || "authorization",
  host_email: process.env.HOST_EMAIL || "masumkhan081.3s@gmail.com",
  host_email_pw: process.env.HOST_EMAIL_PASSWORD || "uigctmtbjzdyfxoa",
  mail_host: process.env.MAIL_HOST || "smtp.gmail.com",
  salt_rounds: 12,
  jwt_options: {
    expiresIn: "730h", // Token will expire in 1 hour
  },
};

module.exports = config;
