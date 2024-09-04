const Showroom = require("../models/showroom.model");

/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createShowroom(data) {
  try {
    const addResult = await Showroom.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getShowrooms(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.showroom });

    const fetchResult = await Showroom.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Showroom.countDocuments(filterConditions);
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
async function updateShowroom({ id, data }) {
  try {
    const editResult = await Showroom.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteShowroom(id) {
  try {
    const deleteResult = await Showroom.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createShowroom,
  updateShowroom,
  deleteShowroom,
  getShowrooms,
};
