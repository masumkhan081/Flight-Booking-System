const bookingService = require("../services/booking.service");
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

async function createBooking(req, res) {
  const result = await bookingService.createBooking(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.booking });
  } else {
    sendCreateResponse({ res, data: result, what: operableEntities.booking });
  }
}
async function getBookings(req, res) {
  // pagination check & logic
  const result = await bookingService.getBookings(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.booking });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.booking });
  }
}
//
async function updateBooking(req, res) {
  const result = await bookingService.updateBooking({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.booking });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.booking });
  }
}
//
async function deleteBooking(req, res) {
  const result = await bookingService.deleteBooking(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.booking });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.booking });
  }
}
//
module.exports = {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookings,
};
