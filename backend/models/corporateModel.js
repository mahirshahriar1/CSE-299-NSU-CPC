const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const corporateSchema = new Schema(
  {
    personName: {
      type: String,
      required: true,
    },
    workEmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      required: true,
    },
    isAlumni: {
      type: String,
      required: true,
    },
    currentPosition: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      required: false,
    },
    picture: {
      type: String,
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);



corporateSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Corporate = mongoose.model("Corporate", corporateSchema); 
module.exports = Corporate;