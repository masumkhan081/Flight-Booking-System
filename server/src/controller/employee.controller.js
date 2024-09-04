const employeeService = require("../services/employee.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");


async function createEmployee(req, res) {
  const result = await employeeService.createEmployee(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
async function getEmployees(req, res) {
  const result = await employeeService.getEmployees(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function updateEmployee(req, res) {
  const result = await employeeService.updateEmployee({
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
async function deleteEmployee(req, res) {
  const result = await employeeService.deleteEmployee(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
};
