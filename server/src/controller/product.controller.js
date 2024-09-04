const productService = require("../services/product.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");


async function createProduct(req, res) {
  const result = await productService.createProduct(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}

async function getProducts(req, res) {
  const result = await productService.getProducts(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function updateProduct(req, res) {
  const result = await productService.updateProduct({
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
async function deleteProduct(req, res) {
  const result = await productService.deleteProduct(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
