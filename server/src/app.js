/* eslint-disable no-unused-vars */
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const httpStatus = require("http-status");
const RootRoutes = require("./routes/root.route");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

const allowedOrigins = ["http://localhost:3001","http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
//
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

//

app.use("/", RootRoutes);

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "I am functional !",
      data: null,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
//

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});
//

module.exports = app;
