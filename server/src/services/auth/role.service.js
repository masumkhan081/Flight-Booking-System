const Role = require("../../models/auth/role.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../../utils/pagination");
const config = require("../../config/index");
 
const { operableEntities } = require("../../config/constants");
const bcrypt = require("bcrypt");

async function createRole(data) {
  try {
    const salt = await bcrypt.genSalt(); // 10 is the number of salt rounds
    // Hash the password with the salt
    data.password = await bcrypt.hash(data.password, salt);
    const addResult = await Role.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}

//
async function getRoles(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.supplier });

  const fetchResult = await Role.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Role.countDocuments(filterConditions);
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
}
//
async function updateRole({ id, data }) {
  try {
    const editResult = await Role.findByIdAndUpdate(id, data, {
      new: true,
    });

    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteRole(id) {
  try {
    const deleteResult = await Role.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  getRoles,
};
