/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const addressSchema = new Schema(
  {
    district: {
      type: String,
      required: true,
    },
    sub_district: {
      type: String,
      required: true,
    },
    village: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Address = model("addresses", addressSchema);

module.exports = Address;
