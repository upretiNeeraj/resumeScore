const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  score: Number,
  missingSkills: [String]
});

module.exports = mongoose.model("Resume", ResumeSchema);