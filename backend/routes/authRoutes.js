const express = require("express");
const passport = require("passport");
const axios = require("axios");
const Student = require("../models/studentModel");
const Alumni = require("../models/alumniModel");
const Corporate = require("../models/corporateModel");
const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

//authenticate the user using google
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/authredirect`,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
  })
);

//forward the request to goggle's authentication server
router.get("/auth/google", async (req, res) => {
  try {
    const response = await axios.get(
      "https://accounts.google.com/o/oauth2/v2/auth",
      {
        params: req.query,
      }
    );
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const findUser = async (model, query) => {
  return await model.findOne(query);
};
const buildResponse = (user, type) => {
    const baseResponse = {
      _id: user._id,
      email: user.email || user.workEmail,
      token: generateToken(user._id),
      userType: type,
      found: true
    };
  
    switch (type) {
      case "corporate":
        return {
          ...baseResponse,
          personName: user.personName,
          isAlumni: user.isAlumni,
          linkedIn: user.linkedIn,
          phone: user.phone,
          currentPosition: user.currentPosition,
          companyName: user.companyName,
          companyAddress: user.companyAddress,
          companyWebsite: user.companyWebsite,
          remark: user.remark,
          picture: user.picture,
        };
      case "admin":
        return {
          ...baseResponse,
          admin: true,
        };
      default:
        return {
          ...baseResponse,
          name: user.name,
          nsu_id: user.nsu_id,
          school: user.school,
          department: user.department,
          picture: user.picture,
          CV: user.CV,
        };
    }
  };
  

router.get("/auth/login/success", async (req, res) => {
  // console.log(req.user);
  if (req.user) {
    const found = await User.findOne({
      email: req.user._json.email,
    });
    
    if (found) {
      if (found.status === 'inactive') {
        // console.log("User is inactive");
        return res.json({
          message: "User is inactive",
        });
      }

      let user;
        console.log(found.type);
      switch (found.type) {
        case "student":
          user = await findUser(Student, { email: req.user._json.email });
          break;
        case "alumni":
          user = await findUser(Alumni, { email: req.user._json.email });
          break;
        case "corporate":
          user = await findUser(Corporate, { workEmail: req.user._json.email });
          break;
        case "admin":
          user = await findUser(Admin, { email: req.user._json.email });
          break;
        default:
          return res.status(401);
      }

      const response = buildResponse(user, found.type);
      res.json(response);
    } else {
      res.json({
        name: req.user._json.name,
        email: req.user._json.email,
        status: "pending",
        picture: req.user._json.picture,
        token: generateToken("pending"),
      });
    }
    // res.status(200).json(req.user._json);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

//login failed
router.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Login Failed");
});

//logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
