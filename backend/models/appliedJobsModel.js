const mongoose = require("mongoose");

const appliedJobsSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    corporateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corporate',
        required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicationDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    CV : {
      type: String,
      required: false
    },
    name : {
      type: String,
      required: true
    },
    email : {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AppliedJob", appliedJobsSchema);
