/* eslint-disable no-unused-vars */
const { Router } = require("express");
// all the routes involved in this project
const userRoutes = require("./user.route");
const addressRoutes = require("./address.route");
const showroomRoutes = require("./showroom.route");
const productCategoryRoutes = require("./productCategory.route");
const productRoutes = require("./product.route");
// const dashboardRoutes = require("./dashboard.route");
const supplierRoutes = require("./supplier.route");
const orderRoutes = require("./order.route");
const purchaseRoutes = require("./purchase.route");
const stockRoutes = require("./stock.route");
const discountRoutes = require("./discount.route");
const saleRoutes = require("./sale.route");
const deliveryRoutes = require("./delivery.route");
const customerRoutes = require("./customer.route");
const employeeRoutes = require("./employee.route");
const salaryRoutes = require("./salary.route");
const expenseCategoryRoutes = require("./expenseCategory.route");
const expenseRoutes = require("./expense.route");
const authRoutes = require("./auth/auth.route");
//
const cardRoutes = require("./cardgen/card.route");
const playerRoutes = require("./cardgen/player.route");
//
const router = Router();

const routes = [
  {
    path: "/cards",
    route: cardRoutes,
  },
  {
    path: "/players",
    route: playerRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/showrooms",
    route: showroomRoutes,
  },
  {
    path: "/employees",
    route: employeeRoutes,
  },
  {
    path: "/addresses",
    route: addressRoutes,
  },
  {
    path: "/product-categories",
    route: productCategoryRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/expense-categories",
    route: expenseCategoryRoutes,
  },
  {
    path: "/suppliers",
    route: supplierRoutes,
  },
  {
    path: "/orders",
    route: orderRoutes,
  },
  {
    path: "/purchases",
    route: purchaseRoutes,
  },
  {
    path: "/stock",
    route: stockRoutes,
  },
  {
    path: "/sales",
    route: saleRoutes,
  },
  {
    path: "/customers",
    route: customerRoutes,
  },

  {
    path: "/customers",
    route: discountRoutes,
  },
  {
    path: "/deliveries",
    route: deliveryRoutes,
  },
  {
    path: "/salaries",
    route: salaryRoutes,
  },
  {
    path: "/expenses",
    route: expenseRoutes,
  },
  // {
  //   path: "/dashboard",
  //   route: dashboardRoutes,
  // },
];

routes.forEach((route) => router.use(route?.path, route?.route));

module.exports = router;
