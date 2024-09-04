const { Schema, model } = require("mongoose");
// const mongoose = require("mongoose");

const deliverySchema = new Schema(
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
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    discount: {
      type: Number,
      default: 0,
      required: false,
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

const Delivery = model("deliveries", deliverySchema);

module.exports = Delivery;
