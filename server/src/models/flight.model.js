const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true,
    },
    airline: {
      type: String,
      required: true,
    },
    // origin
    departureAirport: {
      type: String,
      required: true,
    },
    // destination
    arrivalAirport: {
      type: String,
      required: true,
    },
    // flight-start date-time
    departureTime: {
      type: Date,
      required: true,
    },
    // flight-end date-time
    arrivalTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Flight = mongoose.model("flights", flightSchema);

module.exports = Flight;


