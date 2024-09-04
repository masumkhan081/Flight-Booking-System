const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const employeeSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: { type: String, required: true },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },
    salary: { type: Number, required: false },
    is_user: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Employee = model("employees", employeeSchema);

module.exports = Employee;
