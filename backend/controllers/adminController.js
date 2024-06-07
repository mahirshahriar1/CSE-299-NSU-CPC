const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Corporate = require("../models/corporateModel");
const Alumni = require("../models/alumniModel");
const Student = require("../models/studentModel");
const Job = require("../models/jobModel");

const registerAdminUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists with this email");
  }

  // Hash password before saving to database
  const hashedPassword = await bcrypt.hash(password, 10);
  const user1 = await User.create({ email, type: "admin", status: "active" });
  const user = await Admin.create({ email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user._id,
      admin: true,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

const updateJobStatus = asyncHandler(async (req, res) => {
  const { jobId, status } = req.body;
  const job = await Job.findById(jobId);
  if (job) {
    job.admin_approval = status === "active" ? false : true;

    const updatedJob = await job.save();
    console.log(updatedJob);
    res.json(updatedJob);
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  let typeToFind = req.query.type || "student";
  let user;
  if (typeToFind === "student") {
    user = await Student.find();
    return res.json(user);
  } else if (typeToFind === "alumni") {
    user = await Alumni.find();
    return res.json(user);
  } else if (typeToFind === "corporate") {
    user = await Corporate.find();
    return res.json(user);
  } else {
    res.status(400);
    throw new Error("Invalid user type");
  }
});

const getStatus = asyncHandler(async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  if (user) {
    res.json({ status: user.status });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  if (user) {
    const type = user.type;
    if (type === "student") {
      await Student.deleteOne({ email });
    } else if (type === "alumni") {
      await Alumni.delete({ email });
    } else if (type === "corporate") {
      await Corporate.deleteOne({ workEmail: email });
    }
    await User.deleteOne({ email });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const toggleUserStatus = asyncHandler(async (req, res) => {
  const email = req.query.email;
  const status = req.query.status;
  // console.log(email);
  const user = await User.findOne({ email });
  if (user) {
    user.status = status;
    await user.save();
    res.json({ message: "User status updated" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getPendingJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 3;
  const admin_approval = req.query.admin_approval === 'true';  // Convert string to boolean

  const skip = (page - 1) * limit;

  try {
    const jobs = await Job.find({ admin_approval })
                          .skip(skip)
                          .limit(limit);

    const totalJobs = await Job.countDocuments({ admin_approval });

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

module.exports = {
  registerAdminUser,
  updateJobStatus,
  getUsers,
  deleteUser,
  getStatus,
  toggleUserStatus,
  getPendingJobs,
};
