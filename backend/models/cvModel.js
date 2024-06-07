const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: String,
  linkedin: String,
  github: String,

  // NSU Information
  nsu_id: {
    type: String,
    required: true,
  },
  nsu_email: {
    type: String,
    required: true,
  },

  // Education
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      degree: String,
      fieldOfStudy: String,
      entranceDate: Date,
      graduationDate: Date,
    },
  ],

  // Work Experience
  workExperience: [
    {
      company: {
        type: String,
        required: true,
      },
      position: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],

  // Skills
  skills: [String],

  // Certifications
  certifications: [
    {
      name: String,
      issuer: String,
      issueDate: Date,
    },
  ],

  // Projects
  projects: [
    {
      name: String,
      description: String,
      startDate: Date,
      endDate: Date,
      url: String,
    },
  ],

  // Languages
  languages: [
    {
      name: String,
      proficiency: String,
    },
  ],

  // Additional Information
  summary: String,
  hobbies: [String],
  references: [
    {
      name: String,
      position: String,
      company: String,
      email: String,
      phone: String,
    },
  ],
});

const CV = mongoose.model("CV", cvSchema);

module.exports = CV;
