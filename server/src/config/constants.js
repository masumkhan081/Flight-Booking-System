const operableEntities = {
  flight: "flight",
  booking: "booking",
  user: "user",
};

const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
const defaultViewLimit = 10;
const defaultSortOrder = "desc";

const map_default_sort_by = {
  [operableEntities.flight]: "flight",
  [operableEntities.booking]: "booking",
  [operableEntities.user]: "user",
};

const map_searchables = {
  [operableEntities.flight]: ["name"],
  [operableEntities.booking]: ["name"],
  [operableEntities.user]: ["name"],
};

module.exports = {
  paginationFields,
  defaultViewLimit,
  map_searchables,
  defaultSortOrder,
  map_default_sort_by,
  operableEntities,
  //
};
