/* eslint-disable no-empty */
const Customer = require("../models/customer.model");
const customerCreationSchema = require("../validation/customer.validate");
const Address = require("../models/address.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");

const { operableEntities } = require("../config/constants");

async function createCustomer(data) {
  let validOrNot;
  let response;
  try {
    validOrNot = customerCreationSchema.parse(data);

    console.log(typeof validOrNot.address);

    if (typeof validOrNot.address == "string") {
      console.log("if::1  ");
      response = await Customer.create(data);
      console.log("if:  res: " + JSON.stringify(response));
    } else if (typeof validOrNot.address == "object") {
      console.log("else::1  ");
      const addAddressResult = await Address.create(validOrNot.address);
      console.log("else: res:" + JSON.stringify(addAddressResult));
      validOrNot.address = addAddressResult._id;
      response = await Customer.create(validOrNot);
      console.log("else: res-2:" + JSON.stringify(response));
    }
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getCustomers(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.customer });

    const fetchResult = await Customer.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Customer.countDocuments(filterConditions);
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
async function updateCustomer({ id, data }) {
  try {
    const editResult = await Customer.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteCustomer(id) {
  try {
    const deleteResult = await Customer.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
};
