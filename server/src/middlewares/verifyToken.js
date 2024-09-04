const httpStatus = require("http-status");
const config = require("../config/index");

const { verifyToken } = require("../utils/tokenisation");
const ApiError = require("../utils/api.error");

//  accessRole can be undefined/empty string or "admin" or "salesman"
function accessControl(accessRole) {
  return async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const isVerified = verifyToken({ token, secret: config.jwt_secret });
      if (!isVerified) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
      } else {
        // Assign custom properties to the req object
        req.user_id = isVerified?.user_id;
        req.role = isVerified?.role;
        if (req.role !== accessRole) {
          throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
        } else {
          next();
        }
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Token not found");
    }
  };
}

module.exports = accessControl;
