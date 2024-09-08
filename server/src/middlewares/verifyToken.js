const httpStatus = require("http-status");
const config = require("../config/index");

const { verifyToken } = require("../utils/tokenisation");
const ApiError = require("../utils/api.error");

//  accessRole can be undefined/empty string or "admin" or "salesman"
function accessControl(accessRole) {
  return async (req, res, next) => {
    try {
      const token = req.cookies[config.tkn_header_key];

      if (token) {
        const isVerified = verifyToken({ token, secret: config.tkn_secret });

        if (!isVerified) {
          res.send({
            statusCode: 401,
            message: "Unauthorized !",
            success: false,
          });
        } else {
          // Assign custom properties to the req object
          req.user_id = isVerified?.user_id;
          req.role = isVerified?.role;

          if (req.role !== accessRole) {
            res.send({
              statusCode: 401,
              message: "Unauthorized ! e",
              success: false,
            });
          } else {
            next();
          }
        }
      } else {
        res.send({
          statusCode: 401,
          message: "Unauthorized ! er",
          success: false,
        });
      }
    } catch (error) {
      res.send({
        statusCode: 401,
        message: "Unauthorized ! err",
        success: false,
      });
    }
  };
}

module.exports = accessControl;
