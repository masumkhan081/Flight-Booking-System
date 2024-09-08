/* eslint-disable no-unused-vars */
const { Router } = require("express");

const bookingROute = require("./booking.route");
const flightRoute = require("./flight.route");
const authRoutes = require("./auth/auth.route");
const userRoutes = require("./auth/user.route");
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
    path: "/flight-bookings",
    route: bookingROute,
  },
  {
    path: "/flights",
    route: flightRoute,
  },
];

routes.forEach((route) => router.use(route?.path, route?.route));

module.exports = router;
