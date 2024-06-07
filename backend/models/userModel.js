const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email : {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    type : {
      type: String,
      required: [true, "Please provide a type"],
    },
    status : {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);