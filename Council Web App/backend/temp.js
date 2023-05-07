require("dotenv").config();
const { spawn } = require("child_process");
const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/user");
const userDashboard = require("../backend/routes/userDashboard.js");
const multer = require("multer");
const Data = require("./models/dataModel");
//express app
const app = express();
const router = express.Router();

const CNIC = "13302-0464670-3";
const budget = 7;
const interest = "Gaming";
const degree_program = "BSCS";
const preferred_location = "Islamabad";
const study_group = "CS";
const matric_marks = 800;
const inter_marks = 850;

const test = async () => {
  let data1;
  let data2;
  const pythonOne = spawn("python", [
    "recommendation_V4.py",
    CNIC,
    budget,
    interest,
    degree_program,
    preferred_location,
    study_group,
    matric_marks,
    inter_marks,
  ]);
  pythonOne.stdout.on("data", function (data) {
    data1 = data.toString();
  });
  pythonOne.on("close", (code) => {
    // console.log("pythonOne Closed!");
    const pythonTwo = spawn("python", [
      "cosine_similarity.py",
      data1,
      preferred_location,
      degree_program,
    ]);
    pythonTwo.stdout.on("data", function (data) {
      data2 = data.toString();
    });
    pythonTwo.on("close", (code) => {
      console.log(data2);
    });
  });
};

test();
