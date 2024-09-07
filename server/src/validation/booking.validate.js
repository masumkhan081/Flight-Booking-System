const { z } = require("zod");

// Define the Zod schema
const flightBookingSchema = z.object({
  flight: z.string().nonempty("Flight ID is required"), // Assuming flight ID is a string
  passengerName: z.string().nonempty("Passenger name is required"),
  passengerEmail: z.string().email("Invalid email format"),
  passengerPhone: z.string().nonempty("Passenger phone is required"),
  seatNumber: z.string().nonempty("Seat number is required"),
  bookingDate: z.string().default(() => new Date().toString()), // Default to current date
  status: z.enum(["confirmed", "pending", "canceled"]).default("pending"),
  totalPrice: z.number().min(0, "Total price must be a positive number"),
});

module.exports = flightBookingSchema;
