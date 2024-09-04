const ProductCategory = require("../models/productCategory.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createProductCategory(data) {
  try {
    const addResult = await ProductCategory.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getProductCategories(query) {
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
      what: operableEntities.product_category,
    });

    const fetchResult = await ProductCategory.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await ProductCategory.countDocuments(filterConditions);
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
async function updateProductCategory({ id, data }) {
  try {
    const editResult = await ProductCategory.findByIdAndUpdate(id, data, {
      new: true,
    });

    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteProductCategory(id) {
  try {
    const deleteResult = await ProductCategory.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategories,
};
