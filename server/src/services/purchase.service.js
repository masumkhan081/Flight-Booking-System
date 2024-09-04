const Purchase = require("../models/purchase.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createPurchase(data) {
  try {
    const addResult = await Purchase.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getPurchases(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.purchase });

    const fetchResult = await Purchase.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Purchase.countDocuments(filterConditions);
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
async function updatePurchase({ id, data }) {
  try {
    const editResult = await Purchase.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deletePurchase(id) {
  try {
    const deleteResult = await Purchase.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurchases,
};
