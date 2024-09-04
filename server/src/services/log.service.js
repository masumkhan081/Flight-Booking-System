const httpStatus = require("http-status");
const config = require("../config/index");
//
const { verifyToken } = require("../utils/tokenisation");
const ApiError = require("../utils/api.error");
const AuditLog = require("../models/log.model");

async function logger({ by, action, details }) {
  try {
    const logEntry = new AuditLog({ by, action, details });
    await logEntry.save();
  } catch (error) {
    return error;
  }
}

module.exports = accessControl;
