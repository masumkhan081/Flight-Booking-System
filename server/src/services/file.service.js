/* eslint-disable no-unused-vars */
const { operableEntities } = require("../config/constants");
const File = require("../models/file.model");
const { getSearchAndPagination } = require("../utils/pagination");


async function createFile(data) {
  try {
    const addResult = await File.create(data);
    return addResult;
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.file });
  }
}
//
async function getFiles(query) {
  try{
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.file });

  const fetchResult = await File.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await File.countDocuments(filterConditions);
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
async function updateFile({ id, data }) {
  try {
    const editResult = await File.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.file });
  }
}
//
async function deleteFile(id) {
  try {
    const deleteResult = await File.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.file });
  }
}

module.exports = {
  createFile,
  updateFile,
  deleteFile,
  getFiles,
};
