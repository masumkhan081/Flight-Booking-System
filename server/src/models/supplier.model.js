const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

//  need some answers
const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    supplier_type: {
      type: String,
      enum: ["COMPANY", "CREAFTSPERSON"],
      default: "COMPANY",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Supplier = model("suppliers", supplierSchema);

module.exports = Supplier;
