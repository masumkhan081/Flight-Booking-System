/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const productCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const ProductCategory = model("product_categories", productCategorySchema);

module.exports = ProductCategory;
