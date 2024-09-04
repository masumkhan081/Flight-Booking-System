const Sale = require("../models/sale.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createSale(data) {
  try {
    const addResult = await Sale.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getSales(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.sale });

    const fetchResult = await Sale.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Sale.countDocuments(filterConditions);
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
async function updateSale({ id, data }) {
  try {
    const editResult = await Sale.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteSale(id) {
  try {
    const deleteResult = await Sale.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createSale,
  updateSale,
  deleteSale,
  getSales,
};
