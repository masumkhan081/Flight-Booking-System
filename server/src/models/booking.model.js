const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightBookingSchema = new Schema(
  {
    flight: {
      type: Schema.Types.ObjectId,
      ref: "flights",
      required: true,
    },
    passengerName: {
      type: String,
      required: true,
    },
    passengerEmail: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Invalid email format"],
    },
    passengerPhone: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      default: Date.now.toString(),
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "canceled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FlightBooking = mongoose.model("FlightBooking", flightBookingSchema);

module.exports = FlightBooking;
