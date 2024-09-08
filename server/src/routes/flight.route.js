const { Router } = require("express");
const router = Router();
const flightController = require("../controller/flight.controller");
const validateRequest = require("../middlewares/validateRequest");
const flightSchema = require("../validation/flight.validate");
const accessControl = require("../middlewares/verifyToken");
//

router.post(
  "/",
  accessControl("ADMIN"),
  validateRequest(flightSchema),
  flightController.createFlight
);
router.get("/", flightController.getFlights);
router.patch("/:id", accessControl("ADMIN"), flightController.updateFlight);
router.delete("/:id", accessControl("ADMIN"), flightController.deleteFlight);

module.exports = router;
