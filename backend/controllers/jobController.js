const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

const postJob = asyncHandler(async (req, res) => {
  try {
    const {
      vacancyNumber,
      deadline,
      cgpaRequirement,
      salary,
      jobType,
      category,
      positionName,
      jobLocation,
      requiredExperience,
      preferredProgram,
      companyName,
      jobContext,
      jobResponsibilities,
      additionalRequirement,
      otherBenefits,
      additionalRemarks,
      applicationProcedure,
      tags,
      corporateId,
      imageUrl,
    } = req.body;

    // Verify corporateId is available
    if (!corporateId) {
      return res.status(400).json({
        error: "Corporate ID is missing. Authentication may be required.",
      });
    }

    const newJob = new Job({
      corporate: corporateId, // Include the corporate reference
      vacancyNumber,
      deadline,
      cgpaRequirement,
      salary,
      category,
      jobType,
      positionName,
      jobLocation,
      requiredExperience,
      preferredProgram,
      companyName,
      jobContext,
      jobResponsibilities,
      additionalRequirement,
      otherBenefits,
      additionalRemarks,
      applicationProcedure,
      tags,
      status: "active",
      admin_approval: true,
      picture: imageUrl || "",
    });

    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error posting new job:", error);
    res.status(500).json({ error: "Failed to post new job" });
  }
});

const listJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const corporateId = req.query.corporateId;
  const admin_approval = req.query.admin_approval;
  // Additional filters
  const {
    jobType,
    location,
    salary,
    preferredProgram,
    tags,
    category,
    status,
    keyword,
  } = req.query;
  // console.log(req.query);

  // // Verify corporateId is provided
  // if (!corporateId) {
  //   return res.status(400).json({ error: "Corporate ID is required." });
  // }

  // Construct query object for MongoDB
  const query = {};
  if (admin_approval) {
    query.admin_approval = admin_approval;
  }
  if (corporateId) {
    // query.corporate = corporateId;
  } else if (status) {
    if (status === "active" || status === "closed") {
      query.status = status;
    }
  }
  // else { query.status = "active";}
  if (keyword) {
    // console.log(keyword)
    query.positionName = { $regex: keyword, $options: "i" };
  }

  if (category) {
    query.category = category;
  }
  if (jobType) {
    query.jobType = jobType;
  }
  if (location) {
    query.jobLocation = location;
  }
  if (salary) {
    query.salary = { $gte: parseInt(salary, 10) };
  }
  if (preferredProgram) {
    query.preferredProgram = preferredProgram;
  }
  if (status) {
    query.status = status;
  }

  // tags filter is not implemented in the frontend yet
  if (tags) {
    const tagsArray = tags.split(",").map((tag) => tag.trim()); // Split the tags string into an array and trim whitespace
    query.tags = { $in: tagsArray }; // Use $in to match any of the tags
  }
  // console.log(query);
  try {
    const jobs = await Job.find(query).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(query);

    // console.log(jobs);
    res.json({
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

const getJob = asyncHandler(async (req, res) => {
  const jobId = req.query.jobId;

  try {
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: "Failed to fetch job details" });
  }
});

const closeJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  // Get the corporate ID from the authenticated user (decoded from the token)
  const corporateId = req.user._id;
  console.log(jobId, corporateId);
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    console.log(job.corporate, corporateId);
    // Check if the authenticated user is the owner of the job
    if (job.corporate.toString() !== corporateId.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized to close this job" });
    }

    job.status = "closed";
    await job.save();
    console.log("Job closed successfully");
    res.json({ message: "Job closed successfully" });
  } catch (error) {
    console.error("Error closing job:", error);
    res.status(500).json({ error: "Failed to close job" });
  }
});

const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.body.jobId;

  // Get the corporate ID from the authenticated user (decoded from the token)
  const corporateId = req.user._id;

  console.log(jobId, corporateId);

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.corporate.toString() !== corporateId.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized to delete this job" });
    }

    // Use findByIdAndDelete to remove the job
    await Job.findByIdAndDelete(jobId);
    console.log("Job deleted successfully");
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

const updateJob = asyncHandler(async (req, res) => {
  const jobId = req.query.jobId;
  const corporateId = req.user._id;
  // console.log(jobId);
  try {
    // bring job also check if corporateId is same as the job's corporateId
    const job = await Job.findOne({ _id: jobId, corporate: corporateId });
    // const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updates = req.body;

    // Apply the updates to the job, including resetting admin_approval
    // console.log(updates);
    for (let key in updates) {
      job[key] = updates[key];
    }
    // check if only update done was status
    let check =
      Object.keys(updates).length === 1 && Object.keys(updates)[0] === "status";
    if (!check) {
      job.admin_approval = true;
    }

    const updatedJob = await job.save();
    // console.log(updatedJob);
    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

const updateJobImage = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const imageUrl = req.body.imageUrl;

  //update all jobs of this corporate id
  const jobs = await Job.find({ corporate: id });
  jobs.forEach(async (job) => {
    job.picture = imageUrl;
    await job.save();
  });
  res.json({ message: "Image updated successfully" });
});

module.exports = {
  postJob,
  updateJob,
  deleteJob,
  listJobs,
  getJob,
  closeJob,
  updateJobImage,
};
