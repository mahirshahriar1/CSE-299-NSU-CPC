const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const alumniSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    nsu_id: {
      type: String,
      required: [false, "Please provide an NSU ID"],
      unique: true,
      default: Date.now(),
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    school: {
      type: String,
      required: [false, "Please provide a school"],
    },
    department: {
      type: String,
      required: [false, "Please provide a department"],
    },
    phone: {
      type: String,
      required: [false, "Please provide a phone number"],
    },
    picture: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    CV: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "pending",
    },
    cgpa: {
      type: Number,
      required: false,
    },
    credits: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

alumniSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

alumniSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Alumni = mongoose.model("Alumni", alumniSchema);

module.exports = Alumni;
