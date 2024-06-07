const asyncHandler = require("express-async-handler");
const CV = require("../models/cvModel");

const postCV = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      email,
      phone,
      address,
      linkedin,
      github,
      nsu_id,
      nsu_email,
      education,
      workExperience,
      skills,
      certifications,
      projects,
      languages,
      summary,
      hobbies,
      references,
    } = req.body;

    const found = await CV.findOne({ nsu_email });
    if (found) {   
      // update
      for (const key in req.body) {
        found[key] = req.body[key];
      }
      const updatedCV = await found.save();
      return res.json(updatedCV);
    }


    const newCV = new CV({
      name,
      email,
      phone,
      address,
      linkedin,
      github,
      nsu_id,
      nsu_email,
      education,
      workExperience,
      skills,
      certifications,
      projects,
      languages,
      summary,
      hobbies,
      references,
    });


    const savedCV = await newCV.save();

    res.json(savedCV);
  } catch (error) {
    console.error("Error creating new resume:", error);
    res.status(500).json({ error: "Failed to create new resume" });
  }
});

// router.route('/getCV/:email').get(getResume)
const getCV = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params);
    const resumes = await CV.find({ _id: req.params.cvId });
    // console.log(resumes);
    res.json(resumes[0]);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

const getCVEmail = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params);
    const resumes = await CV.find({ nsu_email: req.params.email });
    // console.log(resumes);
    res.json(resumes[0]);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

module.exports = { postCV , getCV,getCVEmail };
