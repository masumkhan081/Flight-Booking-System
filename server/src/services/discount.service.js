const Discount = require("../models/discount.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createDiscount(data) {
  try {
    const addResult = await Discount.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}

async function getDiscounts(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.discount });

    const fetchResult = await Discount.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Discount.countDocuments(filterConditions);
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

async function updateDiscount({ id, data }) {
  try {
    const editResult = await Discount.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}

async function deleteDiscount(id) {
  try {
    const deleteResult = await Discount.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscounts,
};
