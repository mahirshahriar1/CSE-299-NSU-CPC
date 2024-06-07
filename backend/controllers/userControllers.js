const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const User = require("../models/userModel");
const Alumni = require("../models/alumniModel");
const CV = require("../models/cvModel");
const Corporate = require("../models/corporateModel");
const generateToken = require("../utils/generateToken");
const Admin = require("../models/adminModel");

// const findUser = async (model, query) => {
//   return await model.findOne(query);
// };
const findUser = async (model, query) => {
  //   return await model.findOne(query);

  const user = await model.findOne(query);

  return user;
};

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const found = await User.findOne({ email });
  if (!found) {
    res.status(404);
    throw new Error("User not found");
  }
  if (found.status === "inactive") {
    res.json({ message: "User is inactive" });
    return;
  }
  let user;

  switch (found.type) {
    case "student":
      user = await findUser(Student, { email: req.body.email });
      break;
    case "alumni":
      user = await findUser(Alumni, { email: req.body.email });
      break;
    case "corporate":
      user = await findUser(Corporate, { workEmail: req.body.email });
      break;
    case "admin":
      user = await findUser(Admin, { email: req.body.email });
      break;
    default:
      res.status(401);
      throw new Error("Invalid user type");
  }
 

  if (user && (await user.matchPassword(password))) {
    if (found.type === "corporate") {
      res.json({
        _id: user._id,
        personName: user.personName,
        workEmail: user.workEmail,
        isAlumni: user.isAlumni,
        linkedIn: user.linkedIn,
        phone: user.phone,
        currentPosition: user.currentPosition,
        companyName: user.companyName,
        companyAddress: user.companyAddress,
        companyWebsite: user.companyWebsite,
        remark: user.remark,
        token: generateToken(user._id),
        picture: user.picture,
        userType: "corporate", 
      });
    } else if (found.type === "admin") {
      res.json({
        _id: user._id,
        admin: true,
        email: user.email,
        token: generateToken(user._id),
        userType: "admin",
      });
    } else {
      // console.log("here ", user.CV);
      res.json({
        _id: user._id,
        name: user.name,
        nsu_id: user.nsu_id,
        email: user.email,
        picture: user.picture,
        school: user.school,
        department: user.department,
        phone: user.phone,
        status: user.status,
        CV: user.CV || "",
        token: generateToken(user._id),
        userType: found.type,
        CV: user.CV || "",
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    nsuID,
    school,
    department,
    phone,
    inputs,
    status,
  } = req.body;

  const picture = inputs.image;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  let user, userType;
  if (status === "CS") {
    user = await Student.create({
      name,
      nsu_id: nsuID,
      email,
      password,
      school,
      department,
      phone,
      picture,
      status,
    });
    userType = "student";
  } else if (status === "A") {
    user = await Alumni.create({
      name,
      nsu_id: nsuID,
      email,
      password,
      school,
      department,
      phone,
      picture,
      status,
    });
    userType = "alumni";
  } else {
    res.status(400);
    throw new Error("Invalid user status");
  }

  const user1 = await User.create({
    email,
    type: userType,
    status: "active",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      nsu_id: user.nsu_id,
      email: user.email,
      picture: user.picture,
      phone: user.phone,
      school: user.school,
      department: user.department,
      status: user.status,
      token: generateToken(user._id),
      CV: user.CV || "",
      userType,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  // const user = await Student.findById(req.body._id);
  const found = await User.findOne({ email: req.body.email });
  if (!found) {
    res.status(404);
    throw new Error("User not found");
  }
  let user;
  if (found.type === "student") {
    user = await Student.findOne({ email: req.body.email });
  } else if (found.type === "alumni") {
    user = await Alumni.findOne({ email: req.body.email });
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.picture = req.body.picture || user.picture;
    user.school = req.body.school || user.school;
    user.department = req.body.department || user.department;
    user.phone = req.body.phone || user.phone;
    user.nsu_id = req.body.nsuID || user.nsu_id;
    user.status = req.body.status || user.status;
    user.cgpa = req.body.cgpa || user.cgpa;
    user.credits = req.body.credits || user.credits;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      nsu_id: updatedUser.nsu_id,
      email: updatedUser.email,
      picture: updatedUser.picture,
      school: updatedUser.school,
      phone: updatedUser.phone,
      status: updatedUser.status,
      cgpa: updatedUser.cgpa,
      credits: updatedUser.credits,
      CV: updatedUser.CV,
      department: updatedUser.department,
      phone: updatedUser.phone,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// To get user info for profile, send the user's _id in the request body and get the user's info in the response
const getInfo = asyncHandler(async (req, res) => {
  // get request
  // console.log(req.params.email);
  const found = await User.findOne({ email: req.params.email });
  // console.log(found);
  if (!found) {
    res.status(404);
    throw new Error("User not found");
  }

  let user;
  if (found.type === "student") {
    user = await Student.findOne({ email: req.params.email });
  } else if (found.type === "alumni") {
    user = await Alumni.findOne({ email: req.params.email });
  }
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      nsu_id: user.nsu_id,
      email: user.email,
      picture: user.picture,
      school: user.school,
      department: user.department,
      phone: user.phone,
      status: user.status,
      cgpa: user.cgpa,
      credits: user.credits,
      CV: user.CV,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (user.type === "student") {
    const student = await Student.findOne({ email: req.body.email });
    if (student && (await student.matchPassword(req.body.oldPassword))) {
      student.password = req.body.newPassword;
      const updatedStudent = await student.save();
      res.json({
        _id: updatedStudent._id,
        name: updatedStudent.name,
        nsu_id: updatedStudent.nsu_id,
        email: updatedStudent.email,
        picture: updatedStudent.picture,
        school: updatedStudent.school,
        department: updatedStudent.department,
        status: updatedStudent.status,
        CV : updatedStudent.CV,
        token: generateToken(updatedStudent._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else if (user.type === "alumni") {
    const alumni = await Alumni.findOne({ email: req.body.email });
    if (alumni && (await alumni.matchPassword(req.body.oldPassword))) {
      alumni.password = req.body.newPassword;
      const updatedAlumni = await alumni.save();
      res.json({
        _id: updatedAlumni._id,
        name: updatedAlumni.name,
        nsu_id: updatedAlumni.nsu_id,
        email: updatedAlumni.email,
        picture: updatedAlumni.picture,
        school: updatedAlumni.school,
        department: updatedAlumni.department,
        status: updatedAlumni.status,
        token: generateToken(updatedAlumni._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
});

const uploadCV = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const found = await User.findOne({ email: req.body.email });
  if (!found) {
    res.status(404);
    throw new Error("User not found");
  }
  // console.log(found);
  let user;
  if (found.type === "student") {
    user = await Student.findOne({ email: req.body.email });
  } else if (found.type === "alumni") {
    user = await Alumni.findOne({ email: req.body.email });
  }
  // console.log(user);
  if (user) {
    user.CV = req.body.CV;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      nsu_id: updatedUser.nsu_id,
      email: updatedUser.email,
      picture: updatedUser.picture,
      school: updatedUser.school,
      department: updatedUser.department,
      status: updatedUser.status,
      token: generateToken(updatedUser._id),
      CV: updatedUser.CV,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getCompletedPercentage = asyncHandler(async (req, res) => {
  // console.log(req.query.id);
  const found = await User.findOne({ email: req.query.email });

  if (!found) {
    res.status(404);
    throw new Error("User not found");
  }
  let user;
  if (found.type === "student") {
    user = await Student.findOne({ email: req.query.email });
  } else if (found.type === "alumni") {
    user = await Alumni.findOne({ email: req.query.email });
  } else if (found.type === "corporate") {
    user = await Corporate.findOne({ workEmail: req.query.email });
  }
  if (found.type === 'corporate'){
    const fieldsToCheck = [ "personName", "workEmail", "phone", "linkedIn", "currentPosition", "companyName", "companyAddress", "companyWebsite", "remark", "picture",];
    let cnt = 0;
    fieldsToCheck.forEach((field) => {
      if (user[field]) cnt++;
    });
    let percentage = (cnt / fieldsToCheck.length) * 100;
    res.json({ percentage });
    return;
  }
  const fieldsToCheck = [ "name", "nsu_id", "email", "password", "school",
    "department", "phone", "picture", "CV", "cgpa", "credits",];

  let cnt = 0;
  fieldsToCheck.forEach((field) => {
    if (user[field]) cnt++;
  });

  let percentage = (cnt / fieldsToCheck.length) * 100;
  
  res.json({ percentage });
});

module.exports = {
  registerUser,
  authUser,
  updateUser,
  getInfo,
  changePassword,
  uploadCV,
  getCompletedPercentage,
};
