const accessLevelService = require("../../services/auth/accessLevel.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../utils/responseHandler");
const { operableEntities } = require("../../config/constants");
//

async function createAccessLevel(req, res) {
  const result = await accessLevelService.createAccessLevel(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
async function getAccessLevels(req, res) {
  // pagination check & logic

  const result = await accessLevelService.getAccessLevels(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function updateAccessLevel(req, res) {
  const result = await accessLevelService.updateAccessLevel({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function deleteAccessLevel(req, res) {
  const result = await accessLevelService.deleteAccessLevel(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
module.exports = {
  createAccessLevel,
  updateAccessLevel,
  deleteAccessLevel,
  getAccessLevels,
};
