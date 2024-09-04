const express = require("express");
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const googleRoutes = express.Router();

const cookieParser = require("cookie-parser");
require("dotenv").config();
//
googleRoutes.use(cookieParser());
//
passport.use(
  new GoogleStrategy(
    {
      /*
       */
      clientID:
        "902797761037-t5jelub1i5uanksd13uq0l0ckdogvjvn.apps.googleusercontent.com" ||
        process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        "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" ||
        process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_DOMAIN + "/auth/google/callback",
      profileFields: ["id", "emails", "name", "photos"], //This
    },
    function (accessToken, refreshToken, profile, cb) {
      //
      const name = profile["displayName"];
      const email = profile["emails"][0].value;
      const photo = profile["photos"][0].value;
      const provider = profile["provider"];
      //
      return cb(null, { status: "logged-in", name, email, photo, provider });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
googleRoutes.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleRoutes.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

module.exports = googleRoutes;
