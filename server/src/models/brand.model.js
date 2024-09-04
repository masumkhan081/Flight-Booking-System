const { Schema, model } = require("mongoose");

//  need some answers
const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Brands = model("brands", brandSchema);

module.exports = Brands;
