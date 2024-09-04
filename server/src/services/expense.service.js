const Expense = require("../models/expense.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");
//
async function createExpense(data) {
  try {
    const addResult = await Expense.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getExpenses(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.expense });

    const fetchResult = await Expense.find(filterConditions)
      .populate("category")
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Expense.countDocuments(filterConditions);
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
async function updateExpense({ id, data }) {
  try {
    const editResult = await Expense.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteExpense(id) {
  try {
    const deleteResult = await Expense.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
};
