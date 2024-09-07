/* eslint-disable no-unused-vars */
const { operableEntities } = require("../config/constants");
const Flight = require("../models/flight.model");
const { getSearchAndPagination } = require("../utils/pagination");


async function createFlight(data) {
  try {
    const addResult = await Flight.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getFlights(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.address });

    const fetchResult = await Flight.find(filterConditions)
      .sort(sortConditions)
      .skip("v")
      .limit(viewLimit);

    const total = await Flight.countDocuments(filterConditions);
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
async function updateFlight({ id, data }) {
  try {
    const editResult = await Flight.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteFlight(id) {
  try {
    const deleteResult = await Flight.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createFlight,
  updateFlight,
  deleteFlight,
  getFlights,
};
