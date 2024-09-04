const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const salaryGiving = new Schema({
  paid: {
    type: Number,
    required: true,
  },
  payment_date: {
    type: Date,
    default: Date.now,
  },
});

const salarySchema = new Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    details: [salaryGiving],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Salary = model("salaries", salarySchema);

module.exports = Salary;
