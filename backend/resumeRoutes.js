const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Resume = require("./Resume");

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("resume"), async (req, res) => {
  const data = await pdfParse(req.file.buffer);
  const text = data.text.toLowerCase();

  const jobSkills = ["javascript", "react", "node", "mongodb"];
  const foundSkills = jobSkills.filter(skill => text.includes(skill));
  const missingSkills = jobSkills.filter(skill => !foundSkills.includes(skill));
  const score = Math.round((foundSkills.length / jobSkills.length) * 100);

  const resume = new Resume({
    name: "Student",
    skills: foundSkills,
    score,
    missingSkills
  });

  await resume.save();

  res.json({
    score,
    foundSkills,
    missingSkills
  });
});

module.exports = router;