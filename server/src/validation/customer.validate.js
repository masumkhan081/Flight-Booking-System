const { z } = require("zod");
const addressSchema = require("./address.validate");

const customerCreationSchema = z.object({
  fullName: z.string().min(1).max(50),
  phone: z.string().regex(/^\d{10}$/), // Example: 1234567890
  mobile: z.string(),
  address: z.union([z.string(), addressSchema]),
});

module.exports = customerCreationSchema;
