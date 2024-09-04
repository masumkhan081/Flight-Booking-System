const { Schema, model } = require("mongoose");
// const mongoose = require("mongoose");

const saleSchema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    sale_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Sale = model("sales", saleSchema);

module.exports = Sale;
