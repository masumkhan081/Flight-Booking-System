const { Router } = require("express");
const router = Router();
const bookingController = require("../controller/booking.controller");
const validateRequest = require("../middlewares/validateRequest");
const addressSchema = require("../validation/address.validate");
//

router.post(
  "/",
  validateRequest(addressSchema),
  bookingController.createBooking
);
router.get("/", bookingController.getBookings);
router.patch("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
