const flightService = require("../services/flight.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");
const config = require("../config/index");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");

async function createFlight(req, res) {
  const result = await flightService.createFlight(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.flight });
  } else {
    sendCreateResponse({ res, data: result, what: operableEntities.flight });
  }
}
//
async function getFlights(req, res) {
  const result = await flightService.getFlights(req.query);

  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function updateFlight(req, res) {
  const result = await flightService.updateFlight({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendUpdateResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function deleteFlight(req, res) {
  const result = await flightService.deleteFlight(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.address });
  }
}
//
module.exports = {
  createFlight,
  updateFlight,
  deleteFlight,
  getFlights,
};
