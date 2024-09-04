const Salary = require("../models/salary.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createSalary(data) {
  try {
    const addResult = await Salary.create(data);
    return addResult;
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.salary });
  }
}
//
async function getSalaries(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.salary });

    const fetchResult = await Salary.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Salary.countDocuments(filterConditions);
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
async function updateSalary({ id, data }) {
  try {
    const editResult = await Salary.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.salary });
  }
}
//
async function deleteSalary(id) {
  try {
    const deleteResult = await Salary.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.salary });
  }
}

module.exports = {
  createSalary,
  updateSalary,
  deleteSalary,
  getSalaries,
};
