const { operableEntities } = require("../config/constants");
const Employee = require("../models/employee.model");
const { getSearchAndPagination } = require("../utils/pagination");

async function createEmployee(data) {
  try {
    const addResult = await Employee.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getEmployees(query) {
  try{
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.employee });

  const fetchResult = await Employee.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Employee.countDocuments(filterConditions);
  return {
    meta: {
      total,
      limit: viewLimit,
      page: currentPage,
      skip: viewSkip,
      sortBy,
      sortOrder,
    },
    data: fetchResult,
  };
} catch (error) {
  return error;
}
}
//
async function updateEmployee({ id, data }) {
  try {
    const editResult = await Employee.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteEmployee(id) {
  try {
    const deleteResult = await Employee.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
};
