const { z } = require("zod");  

const flightSchema = z.object({
  flightNumber: z
    .string()
    .min(1, "Flight number is required")
    .max(50, "Flight number is too long"),
  airline: z
    .string()
    .min(1, "Airline is required")
    .max(100, "Airline name is too long"),
  departureAirport: z
    .string()
    .min(1, "Departure airport is required")
    .max(4, "Departure airport code is too long"),
  arrivalAirport: z
    .string()
    .min(1, "Arrival airport is required")
    .max(4, "Arrival airport code is too long"),
  departureTime: z
    .string()
    .datetime({ offset: true })
    .refine((val) => !isNaN(Date.parse(val)), "Invalid departure time"),
  arrivalTime: z
    .string()
    .datetime({ offset: true })
    .refine((val) => !isNaN(Date.parse(val)), "Invalid arrival time"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  aircraft: z
    .string()
    .min(1, "Aircraft type is required")
    .max(50, "Aircraft type is too long"),
  availableSeats: z
    .number()
    .int()
    .nonnegative()
    .min(0, "Available seats cannot be negative"),
  price: z.number().positive("Price must be greater than zero"),
});

module.exports = flightSchema;
