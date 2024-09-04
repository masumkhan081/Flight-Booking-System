const Supplier = require("../models/supplier.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createSupplier(data) {
  try {
    const addResult = await Supplier.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getSuppliers(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.supplier });

    const fetchResult = await Supplier.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Supplier.countDocuments(filterConditions);
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
async function updateSupplier({ id, data }) {
  try {
    const editResult = await Supplier.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteSupplier(id) {
  try {
    const deleteResult = await Supplier.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
};
