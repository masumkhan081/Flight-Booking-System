const { Schema, model } = require("mongoose");

const showroomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    contacts: [{ label: String, contact: String }],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Showroom = model("showrooms", showroomSchema);

module.exports = Showroom;
