const User = require("../../models/auth/user.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../../utils/pagination");
const config = require("../../config/index");

const { operableEntities } = require("../../config/constants");
const bcrypt = require("bcrypt");

async function createUser(data) {
  try {
    const salt = await bcrypt.genSalt(); // 10 is the number of salt rounds
    // Hash the password with the salt
    data.password = await bcrypt.hash(data.password, salt);
    const addResult = await User.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}

//
async function getUsers(query) {
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

    const fetchResult = await User.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await User.countDocuments(filterConditions);
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
async function updateUser({ id, data }) {
  try {
    const editResult = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteUser(id) {
  try {
    const deleteResult = await User.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};
