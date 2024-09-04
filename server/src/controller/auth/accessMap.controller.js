const accessMapService = require("../../services/auth/accessMap.service");
const httpStatus = require("http-status");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../utils/responseHandler");
const { operableEntities } = require("../../config/constants");

async function createAccessMap(req, res) {
  const result = await accessMapService.createaccessMap(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
async function getAccessMaps(req, res) {
  // pagination check & logic

  const result = await accessMapService.getAccessMaps(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function updateaccessMap(req, res) {
  const result = await accessMapService.updateaccessMap({
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
async function deleteaccessMap(req, res) {
  const result = await accessMapService.deleteaccessMap(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
module.exports = {
  createaccessMap,
  updateaccessMap,
  deleteaccessMap,
  getAccessMaps,
};
