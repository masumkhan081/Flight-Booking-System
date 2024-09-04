const deliveryService = require("../services/delivery.service");
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


async function createOrderDelivery(req, res) {
  const result = await deliveryService.createOrderDelivery(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
async function getOrderDeliveries(req, res) {
  const result = await deliveryService.getOrderDeliveries(req.query);

  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function updateOrderDelivery(req, res) {
  const result = await deliveryService.updateOrderDelivery({
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
async function deleteOrderDelivery(req, res) {
  const result = await deliveryService.deleteOrderDelivery(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
module.exports = {
  createOrderDelivery,
  updateOrderDelivery,
  deleteOrderDelivery,
  getOrderDeliveries,
};
