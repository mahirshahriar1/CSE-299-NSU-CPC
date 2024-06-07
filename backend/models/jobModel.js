const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    corporate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Corporate',
      required: true,
    },
    vacancyNumber: {
      type: String,
      required: [true, "Vacancy number is required"],
    },
    deadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    cgpaRequirement: {
      type: Number,
      required: [true, "CGPA requirement is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },
    category : {
      type: String,
      required: [true, "Category is required"],
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
    },
    positionName: {
      type: String,
      required: [true, "Position name is required"],
    },
    jobLocation: {
      type: String,
      required: [true, "Job location is required"],
    },
    requiredExperience: {
      type: String,
      required: [true, "Required experience is required"],
    },
    preferredProgram: {
      type: String,
      default: null,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    jobContext: {
      type: String,
      default: null,
    },
    jobResponsibilities: {
      type: String,
      default: null,
    },
    additionalRequirement: {
      type: String,
      default: null,
    },
    needCV: {
      type: Boolean,
      default: false,
    },
    otherBenefits: {
      type: String,
      default: null,
    },
    additionalRemarks: {
      type: String,
      default: null,
    },
    applicationProcedure: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    status : {
      type: String,
      default: "active",
    },
    admin_approval : {
      type: Boolean,
      default: false,
    },
    picture : {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
