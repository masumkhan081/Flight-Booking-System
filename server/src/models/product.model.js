const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

//   const FileSchema = new Schema({
//   size: String,
//   name: String,
//   type: String,
//   url: String,
//   id: String,
// });

const sizeSchema = new Schema({
  height: String,
  length: String,
  width: String,
});

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brands",
      required: false,
    },
    size: sizeSchema,
    images: [String],
    description: {
      type: String,
      required: true,
    },
    slugs: [String],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Product = model("products", productSchema);

module.exports = Product;

/*
probable furniture sizing parameters:

Height
Width
Depth
Seat Height
Arm Height
Back Height
Leg Height
Clearance or Space
Weight Capacity
Volume

*/
