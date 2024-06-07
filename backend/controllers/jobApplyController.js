const asyncHandler = require("express-async-handler");
const AppliedJobs = require("../models/appliedJobsModel");
const Student = require("../models/studentModel");
const Job = require("../models/jobModel");
const Corporate = require("../models/corporateModel");

const applyJob = asyncHandler(async (req, res) => {
  const { jobId, studentId, CV, email, name } = req.body;
  console.log(jobId, studentId, CV);
  const alreadyApplied = await AppliedJobs.findOne({ jobId, studentId });
  console.log(alreadyApplied);
  if (alreadyApplied) {
    const deleted = await AppliedJobs.deleteMany({ jobId, studentId });
    if (deleted) {
      console.log("deleted");
      // get corporateId
      const job = await Job.findById(jobId);
      const corporateId = job.corporate;

      const appliedJob = new AppliedJobs({
        studentId,
        corporateId,
        jobId,
        CV,
        email,
        name,
      });
      const createdAppliedJob = await appliedJob.save();
      if (createdAppliedJob) {
        // console.log(createdAppliedJob);
        res.json(createdAppliedJob);
      } else {
        res.status(400);
        throw new Error("Invalid job data");
      }
    } else {
      res.status(400);
      throw new Error("Invalid job data");
    }
  } else {
    // get corporateId
    const job = await Job.findById(jobId);
    const corporateId = job.corporate;

    const appliedJob = new AppliedJobs({
      studentId,
      corporateId,
      jobId,
      CV,
      email,
      name,
    });
    const createdAppliedJob = await appliedJob.save();
    if (createdAppliedJob) {
      // console.log(createdAppliedJob);
      res.json(createdAppliedJob);
    } else {
      res.status(400);
      throw new Error("Invalid job data");
    }
  }
});

const getMyJobs = asyncHandler(async (req, res) => {
  const corporateId = req.query.corporateId;
  const jobs = await Job.find({ corporate: corporateId });
  if (jobs) {
    res.json(jobs);
  } else {
    res.status(400);
    throw new Error("Invalid job data");
  }
});

const getAppliedCandidates = asyncHandler(async (req, res) => {
  const jobId = req.query.jobId;
  // console.log(jobId);
  const appliedJobs = await AppliedJobs.find({ jobId });
  if (appliedJobs) {
    res.json(appliedJobs);
  } else {
    res.status(400);
    throw new Error("Invalid job data");
  }
});
const getCountofAppliedCandidates = asyncHandler(async (req, res) => {
  const jobId = req.query.jobId;
  const count = await AppliedJobs.countDocuments({ jobId });
  res.json(count);
});

const getCount = asyncHandler(async (req, res) => {
  const studentId = req.query.studentId;
  const count = await AppliedJobs.countDocuments({ studentId });
  res.json(count);
});

const getAppliedJobs = asyncHandler(async (req, res) => {
  const studentId = req.query.studentId;
  const appliedJobs = await AppliedJobs.find({ studentId });
  if (appliedJobs) {
    res.json(appliedJobs);
  } else {
    res.status(400);
    throw new Error("Invalid job data");
  }
});

const deleteApplication = asyncHandler(async (req, res) => {
  const { jobId, studentId } = req.body;
  const deleted = await AppliedJobs.deleteOne({ jobId, studentId });
  if (deleted) {
    res.json({ message: "Application Deleted" });
  } else {
    res.status(400);
    throw new Error("Invalid job data");
  }
});

const isAlreadyApplied = async (req, res) => {
  const { jobId, studentId } = req.query;
  // console.log(jobId, studentId);
  const alreadyApplied = await AppliedJobs.findOne({ jobId, studentId });
  res.json({ alreadyApplied });
};

module.exports = {
  applyJob,
  getAppliedJobs,
  deleteApplication,
  getAppliedCandidates,
  getCountofAppliedCandidates,
  getCount,
  isAlreadyApplied,
  getMyJobs,
};
