/* eslint-disable no-unused-vars */

const operableEntities = {
  address: "address",
  product: "product",
  customer: "customer",
  supplier: "supplier",
  product_category: "Product category",
  order: "order",
  purchase: "purchase",
  stock: "stock",
  discount: "discount",
  sale: "sale",
  sale_return: "Sale return",
  delivery: "delivery",
  employee: "employee",
  expense: "expense",
  expense_category: "Expense category",
  salary: "salary",
  user: "user",
  showroom: "showroom",
  brand: "brand",
  role: "role",
  access_level: "access_level",
  access_map: "access_map",
};

const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
const defaultViewLimit = 10;
const defaultSortOrder = "desc";

// may be changed based on the outcome expected
const map_default_sort_by = {
  [operableEntities.address]: "address",
  [operableEntities.product]: "product",
  [operableEntities.customer]: "customer",
  [operableEntities.supplier]: "supplier",
  [operableEntities.product_category]: "product_category",
  [operableEntities.order]: "order",
  [operableEntities.purchase]: "purchase",
  [operableEntities.stock]: "stock",
  [operableEntities.discount]: "discount",
  [operableEntities.sale]: "sale",
  [operableEntities.delivery]: "delivery",
  [operableEntities.employee]: "full_name",
  [operableEntities.expense]: "expense",
  [operableEntities.expense_category]: "expense_category",
  [operableEntities.salary]: "salary",
  [operableEntities.showroom]: "showroom",
};

const map_searchables = {
  [operableEntities.address]: [
    "district",
    "subdistrict",
    "village",
    "street",
    "building",
  ],
  [operableEntities.expense_category]: ["name"],
  [operableEntities.product]: ["name"],
  [operableEntities.customer]: ["name"],
  [operableEntities.supplier]: ["supplier_name", "mobile", "phone", "email"],
  [operableEntities.product_category]: ["name"],
  [operableEntities.order]: ["name"],
  [operableEntities.purchase]: ["name"],
  [operableEntities.stock]: ["name"],
  [operableEntities.discount]: ["name"],
  [operableEntities.sale]: ["name"],
  [operableEntities.delivery]: ["name"],
  [operableEntities.employee]: ["full_name", "mobile"],
  [operableEntities.expense]: ["name"],
  [operableEntities.salary]: ["salary"],
  [operableEntities.showroom]: ["title"],
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
