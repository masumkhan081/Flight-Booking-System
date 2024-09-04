const userService = require("../../services/auth/user.service");
const httpStatus = require("http-status");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../utils/responseHandler");
const { operableEntities } = require("../../config/constants");

async function createUser(req, res) {
  const result = await userService.createUser(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.role });
  } else {
    sendCreateResponse({ res, data: result, what: operableEntities.role });
  }
}
async function getUsers(req, res) {
  // pagination check & logic

  const result = await userService.getUsers(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.role });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.role });
  }
}
//
async function updateUser(req, res) {
  const result = await userService.updateUser({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.role });
  } else {
    sendUpdateResponse({ res, data: result, what: operableEntities.role });
  }
}
//
async function deleteUser(req, res) {
  const result = await userService.deleteUser(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.role });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.role });
  }
}
//
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};
