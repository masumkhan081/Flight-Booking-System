/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const expenseDetailSchema = new Schema({
  label: String,
  amount: Number,
});

const expenseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    showroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "showrooms",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expenseCategories",
      required: true,
    },
    expense_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salesmen",
      required: true,
    },
    details: [expenseDetailSchema],
    paid_amount: {
      type: Number,
      required: true,
    },
    remaining_amount: {
      type: Number,
      required: true,
      default: 0,
    },
    note: String,
    expense_date: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Expense = model("expenses", expenseSchema);

module.exports = Expense;
