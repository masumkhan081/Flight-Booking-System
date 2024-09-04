const express = require("express");
const passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
const fbRoutes = express.Router();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
//
fbRoutes.use(cookieParser());
//
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.META_APP_ID,
      clientSecret: process.env.META_APP_SECRET,
      callbackURL: process.env.REDIRECT_DOMAIN + "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      //
      const name = profile["displayName"];
      const email = profile["emails"][0].value;
      const photo = profile["photos"][0].value;
      const provider = profile["provider"];
      //
      return cb(null, {
        status: "logged-in",
        name,
        email,
        photo,
        provider,
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

fbRoutes.get("/", passport.authenticate("facebook"));

fbRoutes.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth" }),
  function (req, res) {
    console.log("Successful authentication");
    res.redirect("http://localhost:3000/ejs");
  }
);
module.exports = fbRoutes;
