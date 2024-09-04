const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const purchaseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    ref_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "refname",
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    conclusion: {
      type: String,
      required: true,
    },
    keywords: [String],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Purchase = model("purchases", purchaseSchema);

module.exports = Purchase;
