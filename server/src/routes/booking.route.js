const { Router } = require("express");
const router = Router();
const bookingController = require("../controller/booking.controller");
const validateRequest = require("../middlewares/validateRequest");
const flightBookingSchema = require("../validation/booking.validate");
//

router.post(
  "/",
  validateRequest(flightBookingSchema),
  bookingController.createBooking
);
router.get("/", bookingController.getBookings);
router.patch("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
