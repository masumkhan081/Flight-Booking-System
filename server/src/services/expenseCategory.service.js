const ExpenseCategory = require("../models/expenseCategory.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const { operableEntities } = require("../config/constants");

async function createExpenseCategory(data) {
  try {
    const addResult = await ExpenseCategory.create(data);
    console.log("addResult: " + JSON.stringify(addResult));
    return addResult;
  } catch (error) {
    console.log("err: " + JSON.stringify(error));
    return error;
  }
}
//
async function getExpenseCategories(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({
      query,
      what: operableEntities.expense_category,
    });

    const fetchResult = await ExpenseCategory.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await ExpenseCategory.countDocuments(filterConditions);
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
async function updateExpenseCategory({ id, data }) {
  try {
    const editResult = await ExpenseCategory.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteExpenseCategory(id) {
  try {
    const deleteResult = await ExpenseCategory.findByIdAndDelete(id);
    returndeleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
};
