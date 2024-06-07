const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Job = require("../models/jobModel");
const Corporate = require("../models/corporateModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerCorporateUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    personName,
    workEmail,
    password,
    phone,
    linkedIn,
    isAlumni,
    currentPosition,
    companyName,
    companyAddress,
    companyWebsite,
    remark,
    picture,
  } = req.body;

  const userExists = await User.findOne({ email: workEmail });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const user1 = await User.create({
    email: workEmail,
    type: "corporate",
    status: "active",
  });

  // Hash password before saving to database
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await Corporate.create({
    personName,
    workEmail,
    password: hashedPassword, // Store the hashed password
    // confirmPassword not stored; it's only used for validation
    phone,
    linkedIn,
    isAlumni,
    currentPosition,
    companyName,
    companyAddress,
    companyWebsite,
    remark,
    picture,
  });
  console.log(user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      personName: user.personName,
      workEmail: user.workEmail,
      phone: user.phone,
      linkedIn: user.linkedIn,
      isAlumni: user.isAlumni,
      currentPosition: user.currentPosition,
      companyName: user.companyName,
      companyAddress: user.companyAddress,
      companyWebsite: user.companyWebsite,
      remark: user.remark,
      token: generateToken(user._id),
      picture : user.picture,
      userType: "corporate",
    });
  } else {
    res.status(400);
    throw new Error("Failed to register user");
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

const getMyJobCount = asyncHandler(async (req, res) => {
  const corporateId = req.query.corporateId;
  const count = await Job.countDocuments({ corporate: corporateId });
  res.json(count);
});

const getInfo = asyncHandler(async (req, res) => {
  // console.log(req.query.email);
  const found = await User.findOne({ email: req.query.email });
  if (!found) {
    res.status(404);
    throw new Error("User not found");
  }

  let user;
  if (found.type === "corporate") {
    user = await Corporate.findOne({ workEmail: req.query.email });
    if (user) {
      res.json({
        _id: user._id,
        name: user.personName,
        workEmail: user.workEmail,
        phone: user.phone,
        linkedIn: user.linkedIn,
        isAlumni: user.isAlumni,
        personName : user.personName,
        currentPosition: user.currentPosition,
        companyName: user.companyName,
        companyAddress: user.companyAddress,
        companyWebsite: user.companyWebsite,
        remark: user.remark,
        picture: user.picture,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { workEmail, oldPassword, newPassword } = req.body;
  console.log(req.body)
  const user = await Corporate.findOne({ workEmail });
  if (user && (await user.matchPassword(oldPassword))) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { personName, phone, linkedIn, currentPosition, companyName, companyAddress, companyWebsite, remark, picture, _id } = req.body;
  // console.log(req.body);
  const user = await Corporate.findById(_id);
  if (user) {
    user.personName = personName || user.personName;
    user.phone = phone || user.phone;
    user.linkedIn = linkedIn || user.linkedIn;
    user.currentPosition = currentPosition || user.currentPosition;
    user.companyName = companyName || user.companyName;
    user.companyAddress = companyAddress || user.companyAddress;
    user.companyWebsite = companyWebsite || user.companyWebsite;
    user.remark = remark || user.remark;
    user.picture = picture || user.picture;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      personName: updatedUser.personName,
      workEmail: updatedUser.workEmail,
      phone: updatedUser.phone,
      linkedIn: updatedUser.linkedIn,
      isAlumni: updatedUser.isAlumni,
      currentPosition: updatedUser.currentPosition,
      companyName: updatedUser.companyName,
      companyAddress: updatedUser.companyAddress,
      companyWebsite: updatedUser.companyWebsite,
      remark: updatedUser.remark,
      picture: updatedUser.picture,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerCorporateUser, changePassword, getInfo , getMyJobs, getMyJobCount,updateUser};
