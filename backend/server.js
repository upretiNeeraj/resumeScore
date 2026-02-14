const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const resumeRoutes = require("./resumeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/resumeAnalyzer");


app.use("/api/resume", resumeRoutes);

app.listen(5001, () => {
    console.log("Server running on port 5001");
});