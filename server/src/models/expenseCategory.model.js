/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");

const expenseCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const ExpenseCategory = model("expenseCategories", expenseCategorySchema);

module.exports = ExpenseCategory;
