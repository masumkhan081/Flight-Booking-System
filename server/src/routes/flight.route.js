const { Router } = require("express");
const router = Router();
const flightController = require("../controller/flight.controller");
const validateRequest = require("../middlewares/validateRequest");
const addressSchema = require("../validation/address.validate");
//

router.post("/", validateRequest(addressSchema), flightController.createFlight);
router.get("/", flightController.getFlights);
router.patch("/:id", flightController.updateFlight);
router.delete("/:id", flightController.deleteFlight);

module.exports = router;
