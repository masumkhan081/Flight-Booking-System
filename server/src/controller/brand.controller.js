const brandService = require("../services/brand.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");

async function createBrand(req, res) {
  const result = await brandService.createBrand(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.brand });
  } else {
    sendCreateResponse({ res, data: result, what: operableEntities.brand });
  }
}
async function getBrandes(req, res) {
  const result = await brandService.getBrandes(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.brand });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.brand });
  }
}
//
async function updateBrand(req, res) {
  const result = await brandService.updateBrand({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.brand });
  } else {
    sendUpdateResponse({ res, data: result, what: operableEntities.brand });
  }
}
//
async function deleteBrand(req, res) {
  const result = await brandService.deleteBrand(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.brand });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.brand });
  }
}
//
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandes,
};
