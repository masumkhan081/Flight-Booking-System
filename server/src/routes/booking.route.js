const { Router } = require("express");
const router = Router();
const bookingController = require("../controller/booking.controller");
const validateRequest = require("../middlewares/validateRequest");
const flightBookingSchema = require("../validation/booking.validate");
const accessControl = require("../middlewares/verifyToken");
//

router.post(
  "/",
  accessControl("ADMIN"),
  validateRequest(flightBookingSchema),
  bookingController.createBooking
);
router.get("/", bookingController.getBookings);
router.patch("/:id", accessControl("ADMIN"), bookingController.updateBooking);
router.delete("/:id", accessControl("ADMIN"), bookingController.deleteBooking);

module.exports = router;
