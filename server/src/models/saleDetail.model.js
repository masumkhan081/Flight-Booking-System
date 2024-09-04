const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Product = require('./product.model');
// const Sale = require('./sale.model');

const saleDetailSchema = new Schema({
  sale: {
    type: Schema.Types.ObjectId,
    ref: "sales",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unit_price: {
    type: Number,
    required: true,
    min: 0,
  },
  total_price: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Create SaleDetail model
const SaleDetail = mongoose.model("SaleDetail", saleDetailSchema);

module.exports = SaleDetail;
