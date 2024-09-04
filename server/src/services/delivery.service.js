const OrderDelivery = require("../models/delivery.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createOrderDelivery(data) {
  try {
    const addResult = await OrderDelivery.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getOrderDeliveries(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.delivery });

    const fetchResult = await OrderDelivery.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await OrderDelivery.countDocuments(filterConditions);
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
async function updateOrderDelivery({ id, data }) {
  try {
    const editResult = await OrderDelivery.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteOrderDelivery(id) {
  try {
    const deleteResult = await OrderDelivery.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createOrderDelivery,
  updateOrderDelivery,
  deleteOrderDelivery,
  getOrderDeliveries,
};
