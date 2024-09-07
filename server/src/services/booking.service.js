/* eslint-disable no-unused-vars */
const { operableEntities } = require("../config/constants");
const FlightBooking = require("../models/booking.model");
const { getSearchAndPagination } = require("../utils/pagination");

async function createBooking(data) {
  try {
    console.log("data :::  "+JSON.stringify(data));
    const addResult = await FlightBooking.create(data);
    return addResult;
  } catch (error) {
    console.log(JSON.stringify(error));
    return error;
  }
}
//
async function getBookings(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.booking });

    const fetchResult = await FlightBooking.find(filterConditions)
      .sort(sortConditions)
      .skip("v")
      .limit(viewLimit);

    const total = await FlightBooking.countDocuments(filterConditions);
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
async function updateBooking({ id, data }) {
  try {
    const editResult = await FlightBooking.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteBooking(id) {
  try {
    const deleteResult = await FlightBooking.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookings,
};
