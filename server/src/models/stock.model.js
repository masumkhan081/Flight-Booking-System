const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

mongoose.model;

module.exports = model(
  "stock",
  new Schema(
    {
      showroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "showrooms",
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      note: String,
    },
    {
      timestamps: true,
      versionKey: false,
      toJSON: { virtuals: true },
    }
  )
);
