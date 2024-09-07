const { z } = require("zod");

const registerSchema = z.object({
  fullName: z.string().min(3).max(75),
  email: z.string().min(15).max(75),
  password: z.string().min(6).max(50),
  phone: z.string().min(11).max(50),
});
const loginSChema = z.object({
  email: z.string().min(15).max(75),
  password: z.string().min(5).max(50),
});

const otpVerSchema = z.object({
  email: z.string().min(15).max(75),
  token: z.string().min(15).max(500),
  otp: z.string().min(4).max(4),
});

const emailVerSchema = z.object({
  email: z.string().min(15).max(75),
});

const resetPassSchema = z.object({
  password: z.string().min(15).max(75),
  confirmPassword: z.string().min(15).max(75),
});

module.exports = {
  registerSchema,
  loginSChema,
  emailVerSchema,
  resetPassSchema,
  otpVerSchema,
};
