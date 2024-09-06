/* eslint-disable no-unused-vars */
const { operableEntities } = require("../config/constants");
const Booking = require("../models/booking.model");
const { getSearchAndPagination } = require("../utils/pagination");

async function createBooking(data) {
  try {
    const addResult = await Booking.createBooking(data);
    return addResult;
  } catch (error) {
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
    } = getSearchAndPagination({ query, what: operableEntities.address });

    const fetchResult = await Booking.find(filterConditions)
      .sort(sortConditions)
      .skip("v")
      .limit(viewLimit);

    const total = await Booking.countDocuments(filterConditions);
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
    const editResult = await Booking.findByIdAndUpdate(id, data, {
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
    const deleteResult = await Booking.findByIdAndDelete(id);
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
